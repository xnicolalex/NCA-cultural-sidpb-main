import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { prisma } from "@/lib/prisma";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("meu_token_de_acesso")?.value;
  if (!token) return NextResponse.json({ error: "Não autenticado." }, { status: 401 });

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    const papel = payload.papel as string;
    if (papel !== "CURADOR" && papel !== "ADMINISTRADOR") {
      return NextResponse.json({ error: "Não autorizado." }, { status: 403 });
    }

    const curadorId = parseInt(payload.sub!);

    const body = await req.json();
    const { registroId, acao, novaCategoria, dominioIdExistente } = body;

    if (!registroId || !acao) {
      return NextResponse.json({ error: "registroId e acao são obrigatórios." }, { status: 400 });
    }

    const registro = await prisma.registroIconografico.findUnique({
      where: { id: registroId },
      select: { categoria_sugerida: true, dominioId: true },
    });

    if (!registro) {
      return NextResponse.json({ error: "Registro não encontrado." }, { status: 404 });
    }

    const sugestaoOriginal = registro.categoria_sugerida?.trim().toLowerCase();

    const updateData: any = {
      curadorId,
      categoria_sugerida: null, 
    };

    if (acao === "DESCARTAR") {
      updateData.status_curadoria = "APROVADO";
    }

    const suggestionCondition = sugestaoOriginal
      ? { categoria_sugerida: sugestaoOriginal, status_curadoria: "PENDENTE" }
      : undefined;

    await prisma.$transaction(async (tx) => {
      if (acao === "PROMOVER") {
        if (!novaCategoria) throw new Error("Nome da nova categoria é obrigatório para PROMOVER.");

        const novoDominio = await tx.dominioCultural.create({
          data: { nome_categoria: novaCategoria.trim() },
        });

        await tx.registroIconografico.update({
          where: { id: registroId },
          data: {
            ...updateData,
            dominioId: novoDominio.id,
            status_curadoria: "APROVADO",
          },
        });

        if (suggestionCondition) {
          await tx.registroIconografico.updateMany({
            where: suggestionCondition,
            data: {
              dominioId: novoDominio.id,
              categoria_sugerida: null,
              status_curadoria: "APROVADO",
              curadorId,
            },
          });
        }
      } else if (acao === "FUNDIR") {
        if (!dominioIdExistente) throw new Error("dominioIdExistente é obrigatório para FUNDIR.");

        await tx.registroIconografico.update({
          where: { id: registroId },
          data: {
            ...updateData,
            dominioId: dominioIdExistente,
            status_curadoria: "APROVADO",
          },
        });

        if (suggestionCondition) {
          await tx.registroIconografico.updateMany({
            where: suggestionCondition,
            data: {
              dominioId: dominioIdExistente,
              categoria_sugerida: null,
              status_curadoria: "APROVADO",
              curadorId,
            },
          });
        }
      } else if (acao === "DESCARTAR") {
        await tx.registroIconografico.update({
          where: { id: registroId },
          data: {
            ...updateData,
            status_curadoria: "APROVADO",
          },
        });

      } else {
        throw new Error("Ação inválida. Use PROMOVER, FUNDIR ou DESCARTAR.");
      }
    });

    return NextResponse.json({ message: "Sugestão processada com sucesso!" });
  } catch (error) {
    console.error("Erro ao processar sugestão:", error);
    return NextResponse.json({ error: "Erro interno ao processar sugestão." }, { status: 500 });
  }
}
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { prisma } from "@/lib/prisma";
import { StatusAnotacao, StatusRevisao } from "@prisma/client";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("meu_token_de_acesso")?.value;
  if (!token) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    const papel = payload.papel as string;
    if (papel !== "CURADOR" && papel !== "ADMINISTRADOR") {
      return NextResponse.json({ error: "Não autorizado." }, { status: 403 });
    }

    const { registroId } = await req.json();
    if (!registroId) {
      return NextResponse.json(
        { error: "ID do registro é obrigatório." },
        { status: 400 }
      );
    }

    // Buscar estado atual para validação
    const registro = await prisma.registroIconografico.findUnique({
      where: { id: registroId },
      select: {
        status_anotacao: true,
        status_revisao: true,
      },
    });

    if (!registro) {
      return NextResponse.json(
        { error: "Registro não encontrado." },
        { status: 404 }
      );
    }

    // Validações de estado
    if (registro.status_anotacao !== StatusAnotacao.ANOTADO) {
      return NextResponse.json(
        { error: "Esta imagem ainda não foi anotada." },
        { status: 409 }
      );
    }

    if (registro.status_revisao !== StatusRevisao.PENDENTE) {
      return NextResponse.json(
        { error: "Esta anotação não está pendente de revisão." },
        { status: 409 }
      );
    }

    // Transação atômica: marcar notas como resolvidas e atualizar o registro
    await prisma.$transaction([
      prisma.reviewNote.updateMany({
        where: {
          registroId,
          resolved: false,
        },
        data: { resolved: true },
      }),
      prisma.registroIconografico.update({
        where: { id: registroId },
        data: {
          status_revisao: StatusRevisao.APROVADO,
          status_bloqueio: "LIVRE", // resetar bloqueio, se houver
        },
      }),
    ]);

    return NextResponse.json({ message: "Anotação aprovada com sucesso." });
  } catch (error) {
    console.error("Erro ao aprovar anotação:", error);
    return NextResponse.json(
      { error: "Erro interno ao aprovar anotação." },
      { status: 500 }
    );
  }
}
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
    if (
      papel !== "ANOTADOR" &&
      papel !== "CURADOR" &&
      papel !== "ADMINISTRADOR"
    ) {
      return NextResponse.json({ error: "Não autorizado." }, { status: 403 });
    }

    const userId = parseInt(payload.sub!);
    const { registroId, descricao, labels, municipio, boundingBoxes } = await req.json();

    if (!registroId) {
      return NextResponse.json(
        { error: "ID do registro é obrigatório." },
        { status: 400 }
      );
    }

    // Buscar estado atual para validação e decisão de fluxo
    const registroAtual = await prisma.registroIconografico.findUnique({
      where: { id: registroId },
      select: {
        status_anotacao: true,
        status_revisao: true,
        status_bloqueio: true,
        anotadorId: true,
      },
    });

    if (!registroAtual) {
      return NextResponse.json(
        { error: "Registro não encontrado." },
        { status: 404 }
      );
    }

    // Verificar bloqueio
    if (registroAtual.status_bloqueio === "BLOQUEADO") {
      return NextResponse.json(
        { error: "Esta imagem está bloqueada para anotação." },
        { status: 403 }
      );
    }

    // Se estiver rejeitado, o anotador está reenviando após correção
    let novoStatusRevisao: StatusRevisao;
    if (registroAtual.status_revisao === StatusRevisao.REJEITADO) {
      novoStatusRevisao = StatusRevisao.PENDENTE;
    } else {
      if (registroAtual.status_revisao === StatusRevisao.APROVADO) {
        return NextResponse.json(
          { error: "Esta anotação já foi aprovada e não pode ser alterada." },
          { status: 409 }
        );
      }
      novoStatusRevisao = StatusRevisao.PENDENTE;
    }

    // Processar labels
    const labelOperations = labels?.length
      ? await Promise.all(
          labels.map(async (labelNome: string) => {
            const label = await prisma.label.upsert({
              where: { nome: labelNome.trim() },
              update: {},
              create: { nome: labelNome.trim() },
            });
            return { labelId: label.id };
          })
        )
      : [];

    // Se boundingBoxes for fornecido e for um array, salvar, senão, manter o que já existe ou null
    let boundingBoxesData = undefined;
    if (boundingBoxes !== undefined) {
      if (Array.isArray(boundingBoxes)) {
        boundingBoxesData = boundingBoxes;
      } else {
        // Se não for array, ignoramos (não alteramos)
        boundingBoxesData = undefined;
      }
    }

    // Atualizar registro
    const updated = await prisma.registroIconografico.update({
      where: { id: registroId },
      data: {
        descricao,
        municipio,
        status_anotacao: StatusAnotacao.ANOTADO,
        status_revisao: novoStatusRevisao,
        anotadorId: userId,
        labels: {
          deleteMany: {},
          create: labelOperations,
        },
        ...(boundingBoxesData !== undefined && { bounding_boxes: boundingBoxesData }),
      },
      include: {
        labels: { include: { label: true } },
      },
    });

    const mensagem =
      registroAtual.status_revisao === StatusRevisao.REJEITADO
        ? "Anotação corrigida e reenviada para revisão!"
        : "Anotação salva com sucesso!";

    return NextResponse.json({
      message: mensagem,
      registro: updated,
    });
  } catch (error) {
    console.error("Erro ao salvar anotação:", error);
    return NextResponse.json(
      { error: "Erro interno ao salvar anotação." },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { prisma } from "@/lib/prisma";
import { StatusRevisao, StatusAnotacao } from "@prisma/client";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);
const MAX_REJECTIONS = 3;

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

    const { registroId, motivo } = await req.json();
    if (!registroId) {
      return NextResponse.json(
        { error: "ID do registro é obrigatório." },
        { status: 400 }
      );
    }

    const curadorId = parseInt(payload.sub!);
    const motivoFinal = motivo?.trim() || "Revisão solicitada sem motivo específico.";

    // 1. Validar estado atual
    const registro = await prisma.registroIconografico.findUnique({
      where: { id: registroId },
      select: {
        status_anotacao: true,
        status_revisao: true,
        status_bloqueio: true,
        anotadorId: true,
      },
    });

    if (!registro) {
      return NextResponse.json(
        { error: "Registro não encontrado." },
        { status: 404 }
      );
    }

    if (registro.status_bloqueio === "BLOQUEADO") {
      return NextResponse.json(
        { error: "Esta imagem já está bloqueada para anotação." },
        { status: 409 }
      );
    }

    if (registro.status_anotacao !== StatusAnotacao.ANOTADO) {
      return NextResponse.json(
        { error: "A imagem ainda não foi anotada." },
        { status: 400 }
      );
    }

    if (registro.status_revisao !== StatusRevisao.PENDENTE) {
      return NextResponse.json(
        { error: "Esta anotação não está pendente de revisão." },
        { status: 409 }
      );
    }

    // 2. Contar rejeições já existentes (notas de revisão)
    const rejectionCount = await prisma.reviewNote.count({
      where: { registroId },
    });

    const newRejectionCount = rejectionCount + 1;
    const shouldBlock = newRejectionCount >= MAX_REJECTIONS;

    // 3. Executar em transação
    const result = await prisma.$transaction(async (tx) => {
      // Criar nota de rejeição
      await tx.reviewNote.create({
        data: {
          registroId,
          reviewerId: curadorId,
          note: motivoFinal,
          resolved: false,
        },
      });

      // Atualizar registro: status_revisao = REJEITADO, manter anotadorId e status_anotacao
      const updated = await tx.registroIconografico.update({
        where: { id: registroId },
        data: {
          status_revisao: StatusRevisao.REJEITADO,
          // status_anotacao permanece ANOTADO
          // anotadorId permanece inalterado
          status_bloqueio: shouldBlock ? "BLOQUEADO" : undefined,
        },
      });

      return updated;
    });

    if (shouldBlock) {
      return NextResponse.json({
        message: `Anotação rejeitada. Atingiu o limite de ${MAX_REJECTIONS} rejeições. Imagem bloqueada.`,
        total_rejections: newRejectionCount,
        blocked: true,
      });
    }

    return NextResponse.json({
      message: "Anotação rejeitada e devolvida ao anotador.",
      total_rejections: newRejectionCount,
      remaining_attempts: MAX_REJECTIONS - newRejectionCount,
      blocked: false,
    });
  } catch (error) {
    console.error("Erro ao rejeitar anotação:", error);
    return NextResponse.json(
      { error: "Erro interno ao rejeitar anotação." },
      { status: 500 }
    );
  }
}
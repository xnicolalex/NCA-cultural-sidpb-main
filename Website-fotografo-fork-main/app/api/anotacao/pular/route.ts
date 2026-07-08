import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { prisma } from "@/lib/prisma";

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

    const { registroId, justificativa } = await req.json();

    if (!registroId || !justificativa?.trim()) {
      return NextResponse.json(
        { error: "ID do registro e justificativa são obrigatórios." },
        { status: 400 }
      );
    }

    await prisma.registroIconografico.update({
      where: { id: registroId },
      data: {
        status_anotacao: "PULADO",
        justificativa_pulo: justificativa.trim(),
      },
    });

    return NextResponse.json({ message: "Imagem pulada com sucesso." });
  } catch (error) {
    console.error("Erro ao pular imagem:", error);
    return NextResponse.json(
      { error: "Erro interno ao pular imagem." },
      { status: 500 }
    );
  }
}
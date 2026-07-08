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

    const { registroId } = await req.json();
    if (!registroId) {
      return NextResponse.json({ error: "ID do registro é obrigatório." }, { status: 400 });
    }

    await prisma.registroIconografico.update({
      where: { id: registroId },
      data: {
        status_curadoria: "APROVADO",
        curadorId: parseInt(payload.sub!),
      },
    });

    return NextResponse.json({ message: "Imagem aprovada." });
  } catch {
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { prisma } from "@/lib/prisma";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function GET() {
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

    const [total, anotadas] = await Promise.all([
      prisma.registroIconografico.count({
        where: { status_curadoria: "APROVADO" },
      }),
      prisma.registroIconografico.count({
        where: {
          status_curadoria: "APROVADO",
          status_anotacao: "ANOTADO",
        },
      }),
    ]);

    return NextResponse.json({
      total,
      anotadas,
    });
  } catch (error) {
    console.error("Erro ao buscar estatísticas de anotação:", error);
    return NextResponse.json(
      { error: "Erro interno ao buscar estatísticas." },
      { status: 500 }
    );
  }
}
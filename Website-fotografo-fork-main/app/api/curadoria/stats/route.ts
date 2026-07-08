import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { prisma } from "@/lib/prisma";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("meu_token_de_acesso")?.value;
  if (!token) return NextResponse.json({ error: "Não autenticado." }, { status: 401 });

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    const papel = payload.papel as string;
    if (papel !== "CURADOR" && papel !== "ADMINISTRADOR") {
      return NextResponse.json({ error: "Não autorizado." }, { status: 403 });
    }

    const [pendentes, aprovados, rejeitados] = await Promise.all([
      prisma.registroIconografico.count({ where: { status_curadoria: "PENDENTE" } }),
      prisma.registroIconografico.count({ where: { status_curadoria: "APROVADO" } }),
      prisma.registroIconografico.count({ where: { status_curadoria: "REJEITADO" } }),
    ]);

    return NextResponse.json({ pendentes, aprovados, rejeitados });
  } catch {
    return NextResponse.json({ error: "Erro ao buscar estatísticas." }, { status: 500 });
  }
}
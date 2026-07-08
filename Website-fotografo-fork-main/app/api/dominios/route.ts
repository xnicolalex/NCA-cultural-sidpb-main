import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const dominios = await prisma.dominioCultural.findMany({
      orderBy: { nome_categoria: 'asc' }
    });
    return NextResponse.json(dominios, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar domínios:", error);
    return NextResponse.json({ error: "Erro ao buscar domínios." }, { status: 500 });
  }
}
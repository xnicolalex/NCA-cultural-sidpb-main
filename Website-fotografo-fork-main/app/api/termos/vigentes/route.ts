import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const termo = await prisma.termoDeUso.findFirst({orderBy: { data_vigencia: 'desc' }});
    const politica = await prisma.politicaDePrivacidade.findFirst({orderBy: { data_vigencia: 'desc' }});

    if (!termo || !politica) { return NextResponse.json({ error: "Documentos legais não encontrados no banco." }, { status: 404 });}

    return NextResponse.json({ termoId: termo.id, politicaId: politica.id }, { status: 200 });
} catch (error) {
    return NextResponse.json({ error: "Erro ao buscar documentos." }, { status: 500 });
  }
}
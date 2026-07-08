// app/api/anotacao/anotadas/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { prisma } from "@/lib/prisma";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("meu_token_de_acesso")?.value;
  if (!token) return NextResponse.json({ error: "Não autenticado." }, { status: 401 });

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    const papel = payload.papel as string;
    const userId = parseInt(payload.sub!);
    if (papel !== "ANOTADOR" && papel !== "CURADOR" && papel !== "ADMINISTRADOR") {
      return NextResponse.json({ error: "Não autorizado." }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const apenasMinhas = searchParams.get("minhas") === "true";

    const where: any = {
      status_anotacao: "ANOTADO",
    };
    if (apenasMinhas) {
      where.anotadorId = userId;
    }

    const anotadas = await prisma.registroIconografico.findMany({
      where,
      include: {
        dominio: { select: { nome_categoria: true } },
        labels: { include: { label: true } },
      },
      orderBy: { data_upload: "desc" },
    });

    return NextResponse.json(anotadas);
  } catch {
    return NextResponse.json({ error: "Token inválido." }, { status: 401 });
  }
}
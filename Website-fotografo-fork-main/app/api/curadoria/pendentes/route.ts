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
    if (papel !== "CURADOR" && papel !== "ADMINISTRADOR") {
      return NextResponse.json({ error: "Não autorizado." }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") ?? undefined;
    const comSugestao = searchParams.get("comSugestao") === "true";

    const where: any = {};

    if (status) {
      where.status_curadoria = status;
    }

    if (comSugestao) {
      where.categoria_sugerida = { not: null };
    }

    const registros = await prisma.registroIconografico.findMany({
      where,
      include: {
        dominio: {
          select: { nome_categoria: true },
        },
      },
      orderBy: { data_upload: "asc" },
    });

    const result = registros.map((r) => ({
      id: r.id,
      url: r.url,
      titulo: r.titulo,
      descricao: r.descricao ?? "",
      municipio: r.municipio ?? "",
      categoria_sugerida: r.categoria_sugerida ?? "",
      licenca: r.licenca,
      data_upload: r.data_upload.toISOString(),
      status_curadoria: r.status_curadoria,
      usuarioId: r.usuarioId,
      dominio: r.dominio,
    }));

    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Erro ao buscar pendentes." }, { status: 500 });
  }
}
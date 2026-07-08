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

    const anotadas = await prisma.registroIconografico.findMany({
      where: {
        status_anotacao: "ANOTADO",
        status_revisao: "PENDENTE",
      },
      include: {
        dominio: { select: { nome_categoria: true } },
        labels: { include: { label: true } },
        anotador: { select: { id: true, nome: true } },
        review_notes: {
          where: { resolved: false },
          orderBy: { created_at: 'desc' },
          take: 1,
        },
      },
      orderBy: { data_upload: "asc" },
    });

    // Processar cada registro de forma assíncrona
    const result = await Promise.all(
      anotadas.map(async (r) => {
        const unresolvedNotes = r.review_notes || [];
        const lastRejection = unresolvedNotes.length > 0 ? unresolvedNotes[0] : null;

        const totalRejections = await prisma.reviewNote.count({
          where: { registroId: r.id },
        });

        return {
          id: r.id,
          url: r.url,
          titulo: r.titulo,
          descricao: r.descricao ?? "",
          municipio: r.municipio ?? "",
          dominio: r.dominio,
          labels: r.labels,
          anotador: r.anotador,
          data_upload: r.data_upload.toISOString(),
          origem: r.origem,
          modelo_ia: r.modelo_ia,
          prompt_ia: r.prompt_ia,
          detalhes_ia: r.detalhes_ia,
          bounding_boxes: r.bounding_boxes || [],
          total_rejections: totalRejections,
          last_rejection_reason: lastRejection?.note || null,
        };
      })
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("Erro ao buscar anotadas:", error);
    return NextResponse.json({ error: "Erro ao buscar anotadas." }, { status: 500 });
  }
}
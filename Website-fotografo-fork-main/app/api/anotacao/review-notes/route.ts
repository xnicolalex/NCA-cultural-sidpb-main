import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { prisma } from "@/lib/prisma";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("meu_token_de_acesso")?.value;
  if (!token) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    const papel = payload.papel as string;
    if (papel !== "ANOTADOR" && papel !== "CURADOR" && papel !== "ADMINISTRADOR") {
      return NextResponse.json({ error: "Não autorizado." }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const registroIdParam = searchParams.get("registroId");
    
    if (!registroIdParam) {
      return NextResponse.json(
        { error: "registroId é obrigatório." },
        { status: 400 }
      );
    }

    // Validação do ID para evitar NaN
    const registroId = parseInt(registroIdParam);
    if (isNaN(registroId)) {
      return NextResponse.json(
        { error: "registroId inválido." },
        { status: 400 }
      );
    }

    // Filtro opcional por resolved (true/false)
    const resolvedParam = searchParams.get("resolved");
    let resolvedFilter: boolean | undefined;
    if (resolvedParam === "true") resolvedFilter = true;
    else if (resolvedParam === "false") resolvedFilter = false;
    // Se não for passado, retorna todas as notas (resolved = true e false)

    const whereClause: any = { registroId };
    if (resolvedFilter !== undefined) {
      whereClause.resolved = resolvedFilter;
    }

    const notes = await prisma.reviewNote.findMany({
      where: whereClause,
      include: {
        reviewer: {
          select: {
            id: true,
            nome: true,
          },
        },
      },
      orderBy: { created_at: "desc" },
    });

    // Formatar dados para o frontend
    const formattedNotes = notes.map((note) => ({
      id: note.id,
      note: note.note,
      created_at: note.created_at.toISOString(),
      resolved: note.resolved,
      reviewer: {
        id: note.reviewer.id,
        nome: note.reviewer.nome,
      },
    }));

    return NextResponse.json({
      data: formattedNotes,
      total: formattedNotes.length,
    });
  } catch (error) {
    console.error("Erro ao buscar notas de revisão:", error);
    return NextResponse.json(
      { error: "Erro interno ao buscar notas." },
      { status: 500 }
    );
  }
}
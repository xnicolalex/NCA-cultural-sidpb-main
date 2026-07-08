import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { prisma } from "@/lib/prisma";
import { PapelUsuario } from "@prisma/client";  

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("meu_token_de_acesso")?.value;

  if (!token) {
    return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    if (payload.papel !== "ADMINISTRADOR") {
      return NextResponse.json({ error: "Não autorizado." }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.toLowerCase() ?? "";
    const papel = searchParams.get("papel") as PapelUsuario | null;
    const status = searchParams.get("status"); 
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1"));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") ?? "20")));

    const where: any = {};

    if (search) {
      where.OR = [
        { nome: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ];
    }

    if (papel && Object.values(PapelUsuario).includes(papel)) {
      where.papel = papel;
    }

    if (status === "ativa") {
      where.status_conta = true;
    } else if (status === "inativa") {
      where.status_conta = false;
    }

    const [users, total] = await Promise.all([
      prisma.usuario.findMany({
        where,
        select: {
          id: true,
          nome: true,
          email: true,
          papel: true,
          status_conta: true,
          ultimo_acesso: true,
        },
        orderBy: { id: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.usuario.count({ where }),
    ]);

    const result = users.map((u) => ({
      id: u.id,
      nome: u.nome,
      email: u.email,
      papel: u.papel,
      status_conta: u.status_conta,
      ultimo_acesso: u.ultimo_acesso?.toISOString() ?? null,
    }));

    return NextResponse.json({
      data: result,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch {
    return NextResponse.json({ error: "Token inválido." }, { status: 401 });
  }
}
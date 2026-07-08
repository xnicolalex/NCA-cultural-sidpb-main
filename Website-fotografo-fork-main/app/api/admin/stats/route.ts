import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { prisma } from "@/lib/prisma";
import { PapelUsuario } from "@prisma/client";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function GET() {
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

    const usuarios = await prisma.usuario.groupBy({
      by: ["papel"],
      _count: { id: true },
    });

    const ativos = await prisma.usuario.count({ where: { status_conta: true } });
    const inativos = await prisma.usuario.count({ where: { status_conta: false } });

    const counts = usuarios.reduce((acc, curr) => {
      acc[curr.papel] = curr._count.id;
      return acc;
    }, {} as Record<string, number>);

    return NextResponse.json({
      total: ativos + inativos,
      ativos,
      inativos,
      porPapel: {
        [PapelUsuario.ADMINISTRADOR]: counts[PapelUsuario.ADMINISTRADOR] ?? 0,
        [PapelUsuario.CURADOR]: counts[PapelUsuario.CURADOR] ?? 0,
        [PapelUsuario.ANOTADOR]: counts[PapelUsuario.ANOTADOR] ?? 0,
        [PapelUsuario.COLABORADOR]: counts[PapelUsuario.COLABORADOR] ?? 0,
      },
    });
  } catch {
    return NextResponse.json({ error: "Token inválido." }, { status: 401 });
  }
}
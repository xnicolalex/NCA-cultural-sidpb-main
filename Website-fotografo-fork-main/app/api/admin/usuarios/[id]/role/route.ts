import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { prisma } from "@/lib/prisma";
import { PapelUsuario } from "@prisma/client";  

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const adminId = parseInt(payload.sub!);
    const { id } = await params;
    const targetId = parseInt(id);

    if (adminId === targetId) {
      return NextResponse.json(
        { error: "Não pode alterar o próprio papel." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { newRole } = body as { newRole?: string };

    if (!newRole || !Object.values(PapelUsuario).includes(newRole as PapelUsuario)) {
      return NextResponse.json(
        {
          error: `Papel inválido. Valores aceitos: ${Object.values(PapelUsuario).join(", ")}.`,
        },
        { status: 422 }
      );
    }

    const updated = await prisma.usuario.update({
      where: { id: targetId },
      data: { papel: newRole as PapelUsuario },
      select: { id: true, nome: true, papel: true },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Erro ao alterar papel:", error);
    return NextResponse.json(
      { error: "Erro interno ao alterar papel." },
      { status: 500 }
    );
  }
}
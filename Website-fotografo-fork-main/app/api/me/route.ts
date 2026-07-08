import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { prisma } from "@/lib/prisma";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function GET(req: NextRequest) {
  const token = req.cookies.get("meu_token_de_acesso")?.value;
  if (!token) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    const userId = parseInt(payload.sub!);
    const user = await prisma.usuario.findUnique({ where: { id: userId } });

    if (!user || !user.status_conta) {
      return NextResponse.json({ error: "Sessão inválida" }, { status: 401 });
    }

    return NextResponse.json({
      id: user.id,
      nome: user.nome,
      email: user.email,
      papel_acesso: user.papel,  
    });
  } catch {
    return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  }
}
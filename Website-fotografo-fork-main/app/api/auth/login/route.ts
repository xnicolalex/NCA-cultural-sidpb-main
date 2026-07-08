import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs"; 
import { SignJWT } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, senha } = body;

    if (!email || !senha) {
      return NextResponse.json(
        { error: "E-mail e senha são obrigatórios." },
        { status: 400 }
      );
    }

    const user = await prisma.usuario.findUnique({
      where: { email },
    });

    if (!user || !user.status_conta) {
      return NextResponse.json(
        { error: "Credenciais inválidas. Verifique seu e-mail e senha." },
        { status: 401 }
      );
    }

    const passwordMatch = await bcrypt.compare(senha, user.senha);

    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Credenciais inválidas. Verifique seu e-mail e senha." },
        { status: 401 }
      );
    }

    await prisma.usuario.update({
      where: { id: user.id },
      data: { ultimo_acesso: new Date() },
    });

    const token = await new SignJWT({
      sub: user.id.toString(),
      papel: user.papel,      
      email: user.email,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")  
      .sign(JWT_SECRET);

    const response = NextResponse.json(
      {
        message: "Login realizado com sucesso!",
        user: {
          id: user.id,
          nome: user.nome,
          email: user.email,
          papel_acesso: user.papel,   
        },
      },
      { status: 200 }
    );

    response.cookies.set("meu_token_de_acesso", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, 
    });

    return response;
  } catch (error) {
    console.error(
      "Erro no login:",
      process.env.NODE_ENV === "development" ? error : "Oculto"
    );
    return NextResponse.json(
      { error: "Ocorreu um erro interno no servidor." },
      { status: 500 }
    );
  }
}
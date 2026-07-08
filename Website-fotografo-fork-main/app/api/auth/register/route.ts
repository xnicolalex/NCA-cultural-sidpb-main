import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"  

export async function POST(request: Request) {
  try {
    const { nome, email, senha } = await request.json()

    if (!nome || !email || !senha) {
      return NextResponse.json({ error: "Nome, email e senha são obrigatórios." }, { status: 400 })
    }

    const [userExists, termoVigente, politicaVigente] = await Promise.all([
      prisma.usuario.findUnique({ where: { email } }),
      prisma.termoDeUso.findFirst({ orderBy: { id: "desc" } }),
      prisma.politicaDePrivacidade.findFirst({ orderBy: { id: "desc" } }),
    ])

    if (userExists) {
      return NextResponse.json({ error: "Este email já está registado." }, { status: 400 })
    }

    if (!termoVigente || !politicaVigente) {
      return NextResponse.json({ error: "Documentos legais não configurados no sistema." }, { status: 500 })
    }

    const hashedPassword = await bcrypt.hash(senha, 10)

    const newUser = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha: hashedPassword,
        termos_aceitos: { 
          create: { termoId: termoVigente.id } 
        },
        politicas_aceitas: { 
          create: { politicaId: politicaVigente.id } 
        },
      },
    })

    return NextResponse.json(
      { message: "Utilizador criado com sucesso!", userId: newUser.id },
      { status: 201 }
    )
  } catch (error) {
    console.error("Erro no registo:", error)
    return NextResponse.json({ error: "Erro interno ao processar o registo." }, { status: 500 })
  }
}
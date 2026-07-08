import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers"
import { jwtVerify } from "jose"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!)

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("meu_token_de_acesso")?.value

    if (!token) {
      return NextResponse.json({ error: "Sessão inválida ou expirada." }, { status: 401 })
    }

    let userId: number
    let papel: string
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET)
      userId = parseInt(payload.sub!)
      papel = payload.papel as string
    } catch {
      return NextResponse.json({ error: "Token inválido." }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const usuarioId = searchParams.get("usuarioId")

    if (!usuarioId) {
      return NextResponse.json({ error: "ID do usuário não fornecido." }, { status: 400 })
    }

    const targetUserId = parseInt(usuarioId)

    if (userId !== targetUserId && papel !== "ADMINISTRADOR") {
      return NextResponse.json(
        { error: "Privilégios insuficientes." },
        { status: 403 }
      )
    }

    const registros = await prisma.registroIconografico.findMany({
      where: { usuarioId: targetUserId },
      include: {
        dominio: {
          select: { nome_categoria: true },
        },
      },
      orderBy: { id: "desc" },
    })

    return NextResponse.json(registros, { status: 200 })
  } catch (error) {
    console.error("Erro ao buscar registros:", error)
    return NextResponse.json({ error: "Erro interno no servidor." }, { status: 500 })
  }
}
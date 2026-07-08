import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers"
import { jwtVerify } from "jose"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!)
const PAPEIS_PERMITIDOS_SELF = ["COLABORADOR", "ANOTADOR", "CURADOR", "ADMINISTRADOR"] 
const ADMIN_ROLE = "ADMINISTRADOR"

export async function PUT(request: Request) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("meu_token_de_acesso")?.value

    if (!token) {
      return NextResponse.json({ error: "Sessão inválida ou expirada." }, { status: 401 })
    }

    let payload: { sub: string; papel: string }
    try {
      const verified = await jwtVerify(token, JWT_SECRET)
      payload = verified.payload as { sub: string; papel: string }
    } catch {
      return NextResponse.json({ error: "Token inválido." }, { status: 401 })
    }

    const authenticatedUserId = parseInt(payload.sub)
    const authenticatedUserRole = payload.papel

    const { usuarioId } = await request.json()

    if (!usuarioId) {
      return NextResponse.json({ error: "ID do usuário não fornecido." }, { status: 400 })
    }

    const targetUserId = parseInt(usuarioId)

    const isSelfService = targetUserId === authenticatedUserId && PAPEIS_PERMITIDOS_SELF.includes(authenticatedUserRole)

    const isAdmin = authenticatedUserRole === ADMIN_ROLE

    if (!isSelfService && !isAdmin) {
      return NextResponse.json(
        { error: "Privilégios insuficientes." },
        { status: 403 }
      )
    }

    await prisma.usuario.update({
      where: { id: targetUserId },
      data: { status_conta: false },
    })

    return NextResponse.json({ message: "Conta inativada com sucesso." }, { status: 200 })
  } catch (error) {
    console.error("Erro ao inativar conta:", error)
    return NextResponse.json({ error: "Erro interno no servidor." }, { status: 500 })
  }
}
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers"

const PAPEIS_PERMITIDOS = ["Colaborador", "Anotador", "Curador"]

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("meu_token_de_acesso")?.value
    const papelUsuario = cookieStore.get("usuario_papel")?.value || ""

    if (!token || !PAPEIS_PERMITIDOS.includes(papelUsuario)) {
      return NextResponse.json(
        { error: "Acesso negado. Token inválido ou privilégios insuficientes." },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { usuarioId, termoId, politicaId, aceitouAmbos } = body

    if (!usuarioId || !termoId || !politicaId) {
      return NextResponse.json(
        { error: "Faltam os IDs do utilizador ou dos documentos legais." },
        { status: 400 }
      )
    }

    if (aceitouAmbos !== true) {
      return NextResponse.json(
        { error: "É obrigatório aceitar os Termos e a Política para prosseguir." },
        { status: 400 }
      )
    }

    const uId = parseInt(usuarioId)
    const tId = parseInt(termoId)
    const pId = parseInt(politicaId)

    await prisma.$transaction([
      prisma.usuarioTermo.upsert({
        where: {
          usuarioId_termoId: { usuarioId: uId, termoId: tId },
        },
        update: { data_aceite: new Date() },
        create: { usuarioId: uId, termoId: tId },
      }),
      prisma.usuarioPolitica.upsert({
        where: {
          usuarioId_politicaId: { usuarioId: uId, politicaId: pId },
        },
        update: { data_aceite: new Date() },
        create: { usuarioId: uId, politicaId: pId },
      }),
    ])

    return NextResponse.json(
      { message: "Consentimento legal registado com sucesso em ambos os documentos!" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Erro ao gravar consentimento:", error)
    return NextResponse.json(
      { error: "Ocorreu um erro interno ao processar o consentimento legal." },
      { status: 500 }
    )
  }
}
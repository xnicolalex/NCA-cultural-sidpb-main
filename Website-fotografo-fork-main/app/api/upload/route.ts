import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { writeFile, mkdir } from "fs/promises"
import path from "path"
import { cookies } from "next/headers"
import { jwtVerify } from "jose"
import crypto from "crypto"
import exifr from "exifr"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!)
const REGRAS_UPLOAD = ["COLABORADOR", "ANOTADOR", "CURADOR", "ADMINISTRADOR"]
const TAMANHO_MAXIMO = 10 * 1024 * 1024

export async function POST(request: Request) {
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

    if (!REGRAS_UPLOAD.includes(papel)) {
      return NextResponse.json({ error: "Privilégios insuficientes." }, { status: 403 })
    }

    const formData = await request.formData()
    const file = formData.get("imagem") as File | null
    const titulo = formData.get("titulo") as string
    const descricao = formData.get("descricao") as string
    const municipio = formData.get("municipio") as string
    const dominioId = parseInt(formData.get("dominioId") as string)
    const licenca = (formData.get("licenca") as string) || "OPENRAIL-D";
    const categoria_sugerida = (formData.get("categoria_sugerida") as string) || ""
    const origem = (formData.get("origem") as string) || "COLABORATIVO"
    const modeloIa = (formData.get("modelo_ia") as string) || undefined
    const promptIa = (formData.get("prompt_ia") as string) || undefined
    const detalhesIa = (formData.get("detalhes_ia") as string) || undefined

    if (origem === "IA_GENERATIVA" && papel === "COLABORADOR") {
      return NextResponse.json({ error: "Colaboradores não podem enviar imagens geradas por IA." }, { status: 403 })
    }

    if (origem === "IA_GENERATIVA" && (!modeloIa || !promptIa)) {
      return NextResponse.json({ error: "Modelo e prompt são obrigatórios para imagens de IA." }, { status: 400 })
    }

    if (!file || !titulo || !dominioId) {
      return NextResponse.json({ error: "A imagem, o título e o domínio são obrigatórios." }, { status: 400 })
    }

    const formatosPermitidos = ["image/jpeg", "image/png"]
    if (!formatosPermitidos.includes(file.type)) {
      return NextResponse.json({ error: "Formato inválido. Apenas imagens JPG, JPEG e PNG são permitidas para o dataset." }, { status: 415 })
    }

    if (file.size > TAMANHO_MAXIMO) {
      return NextResponse.json({ error: "A imagem excede o tamanho máximo de 10 MB." }, { status: 413 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const hash_sha256 = crypto.createHash("sha256").update(buffer).digest("hex")

    const originalName = file.name.replace(/[/\\]/g, "_").replace(/\s/g, "_")
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    const filename = `${uniqueSuffix}-${originalName}`

    const uploadDir = path.join(process.cwd(), "public", "uploads")
    await mkdir(uploadDir, { recursive: true })
    const filepath = path.join(uploadDir, filename)
    await writeFile(filepath, buffer)

    const urlRelativa = `/api/uploads/${filename}`

    let exifData: any = {}
    try {
      exifData = await exifr.parse(buffer, {
        pick: ["DateTimeOriginal", "ImageWidth", "ImageHeight", "Model", "Make", "GPSLatitude", "GPSLongitude"],
      })
    } catch {}

    const dataCaptura = exifData?.DateTimeOriginal ? new Date(exifData.DateTimeOriginal) : undefined
    const larguraPixels = exifData?.ImageWidth ?? undefined
    const alturaPixels = exifData?.ImageHeight ?? undefined
    const modeloCamera = exifData?.Model ? `${exifData.Make ?? ""} ${exifData.Model}`.trim() : undefined
    const latitude = exifData?.GPSLatitude ?? undefined
    const longitude = exifData?.GPSLongitude ?? undefined
    const exifCamera = !!(exifData?.Make || exifData?.Model || exifData?.DateTimeOriginal)

    const novoRegistro = await prisma.registroIconografico.create({
      data: {
        url: urlRelativa,
        hash_sha256,
        titulo,
        descricao,
        municipio,
        licenca,
        usuarioId: userId,
        dominioId,
        categoria_sugerida,
        status_curadoria: "PENDENTE",
        data_captura: dataCaptura,
        largura_pixels: larguraPixels,
        altura_pixels: alturaPixels,
        tamanho_bytes: file.size,
        formato_arquivo: file.type,
        modelo_camera: modeloCamera,
        latitude,
        longitude,
        exif_camera: exifCamera,
        origem: origem as any,
        modelo_ia: modeloIa,
        prompt_ia: promptIa,
        detalhes_ia: detalhesIa,
      },
    })

    return NextResponse.json(
      { message: "Imagem enviada com sucesso para curadoria!", registro: novoRegistro },
      { status: 201 }
    )
  } catch (error) {
    console.error("Erro no upload:", error)
    return NextResponse.json(
      { error: "Ocorreu um erro interno ao processar o upload." },
      { status: 500 }
    )
  }
}
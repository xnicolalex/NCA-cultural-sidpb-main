import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { prisma } from "@/lib/prisma";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("meu_token_de_acesso")?.value;
  if (!token) return NextResponse.json({ error: "Não autenticado." }, { status: 401 });

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    const papel = payload.papel as string;
    if (papel !== "ANOTADOR" && papel !== "CURADOR" && papel !== "ADMINISTRADOR") {
      return NextResponse.json({ error: "Não autorizado." }, { status: 403 });
    }

    const registro = await prisma.registroIconografico.findFirst({
      where: {
        status_curadoria: "APROVADO",
        status_anotacao: "PENDENTE",
      },
      include: {
        dominio: { select: { nome_categoria: true } },
        labels: { include: { label: true } },
      },
      orderBy: { data_upload: "asc" },
    });

    if (!registro) {
      return NextResponse.json({ message: "Nenhuma imagem pendente de anotação." }, { status: 200 });
    }

    return NextResponse.json(registro);
  } catch {
    return NextResponse.json({ error: "Token inválido." }, { status: 401 });
  }
}
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") ?? "";

const REGRAS_ACESSO: Record<string, string[]> = {
  "/curadoria": ["CURADOR", "ADMINISTRADOR"],
  "/api/curadoria": ["CURADOR", "ADMINISTRADOR"],

  "/anotacao": ["ANOTADOR", "CURADOR", "ADMINISTRADOR"],
  "/api/anotacao": ["ANOTADOR", "CURADOR", "ADMINISTRADOR"],

  "/contribuir": ["COLABORADOR", "ANOTADOR", "CURADOR", "ADMINISTRADOR"],
  "/perfil": ["COLABORADOR", "ANOTADOR", "CURADOR", "ADMINISTRADOR"],
  "/api/upload": ["COLABORADOR", "ANOTADOR", "CURADOR", "ADMINISTRADOR"],
  "/api/usuarios": ["COLABORADOR", "ANOTADOR", "CURADOR", "ADMINISTRADOR"],
  "/api/termos/aceite": ["COLABORADOR", "ANOTADOR", "CURADOR", "ADMINISTRADOR"],
  "/api/registros": ["COLABORADOR", "ANOTADOR", "CURADOR", "ADMINISTRADOR"],

  "/admin": ["ADMINISTRADOR"],
  "/api/admin": ["ADMINISTRADOR"],
};

function withoutBasePath(pathname: string) {
  if (!BASE_PATH || BASE_PATH === "/") return pathname;
  if (pathname === BASE_PATH) return "/";
  if (pathname.startsWith(`${BASE_PATH}/`)) return pathname.slice(BASE_PATH.length);
  return pathname;
}

function homeUrl(request: NextRequest) {
  return new URL(BASE_PATH || "/", request.url);
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("meu_token_de_acesso")?.value;
  const pathname = withoutBasePath(request.nextUrl.pathname);

  const rotaBase = Object.keys(REGRAS_ACESSO).find((rota) =>
    pathname.startsWith(rota)
  );

  if (!rotaBase) {
    return NextResponse.next();
  }

  if (!token) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json(
        { error: "Sessão inválida ou expirada." },
        { status: 401 }
      );
    }
    return NextResponse.redirect(homeUrl(request));
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    const papel = payload.papel as string;
    const papeisPermitidos = REGRAS_ACESSO[rotaBase];

    if (!papel || !papeisPermitidos.includes(papel)) {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json(
          { error: "Privilégios insuficientes." },
          { status: 403 }
        );
      }
      return NextResponse.redirect(homeUrl(request));
    }

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", payload.sub as string);
    requestHeaders.set("x-user-papel", papel);

    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  } catch {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json(
        { error: "Sessão inválida ou expirada." },
        { status: 401 }
      );
    }
    return NextResponse.redirect(homeUrl(request));
  }
}

export const config = {
  matcher: [
    "/contribuir/:path*",
    "/perfil/:path*",
    "/anotacao/:path*",
    "/curadoria/:path*",
    "/api/upload/:path*",
    "/api/usuarios/:path*",
    "/api/termos/aceite/:path*",
    "/api/anotacao/:path*",
    "/api/curadoria/:path*",
    "/api/registros/:path*",
    "/admin/:path*",
    "/api/admin/:path*",
  ],
};

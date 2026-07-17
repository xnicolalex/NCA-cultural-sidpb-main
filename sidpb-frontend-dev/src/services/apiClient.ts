export type ApiEnvelope<T> = T | { data: T }

export class ApiError extends Error {
  status: number
  details: unknown

  constructor(message: string, status: number, details?: unknown) {
    super(message)
    this.name = "ApiError"
    this.status = status
    this.details = details
  }
}

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ?? ""
export const SHOULD_USE_MOCKS =
  process.env.NEXT_PUBLIC_USE_API_MOCKS === "true" || API_BASE_URL.length === 0

type QueryValue = string | number | boolean | null | undefined | Array<string | number | boolean>

interface RequestOptions extends Omit<RequestInit, "body"> {
  params?: Record<string, QueryValue>
  body?: unknown
  timeoutMs?: number
}

function buildUrl(path: string, params?: Record<string, QueryValue>) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`
  const origin = typeof window === "undefined" ? "http://localhost" : window.location.origin
  const url = new URL(`${API_BASE_URL}${normalizedPath}`, origin)

  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return

    if (Array.isArray(value)) {
      if (value.length > 0) url.searchParams.set(key, value.join(","))
      return
    }

    url.searchParams.set(key, String(value))
  })

  return url.toString()
}

function unwrapEnvelope<T>(payload: ApiEnvelope<T>): T {
  if (payload && typeof payload === "object" && "data" in payload) {
    return (payload as { data: T }).data
  }

  return payload as T
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  if (!API_BASE_URL) {
    throw new ApiError("NEXT_PUBLIC_API_BASE_URL nao foi configurado.", 0)
  }

  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), options.timeoutMs ?? 15000)

  try {
    const response = await fetch(buildUrl(path, options.params), {
      ...options,
      headers: {
        Accept: "application/json",
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...options.headers,
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
      signal: options.signal ?? controller.signal,
    })

    const text = await response.text()
    const payload = text ? JSON.parse(text) : null

    if (!response.ok) {
      throw new ApiError(
        payload?.message ?? `Erro ${response.status} ao chamar ${path}.`,
        response.status,
        payload
      )
    }

    return unwrapEnvelope<T>(payload as ApiEnvelope<T>)
  } finally {
    window.clearTimeout(timeout)
  }
}

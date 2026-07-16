const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") ?? ""

export const basePath = rawBasePath === "/" ? "" : rawBasePath

function isExternalPath(path: string) {
  return /^(?:[a-z][a-z0-9+.-]*:)?\/\//i.test(path) || path.startsWith("data:") || path.startsWith("blob:")
}

export function withBasePath(path: string) {
  if (!path || isExternalPath(path) || !path.startsWith("/")) return path
  if (!basePath || path === basePath || path.startsWith(`${basePath}/`)) return path
  return `${basePath}${path}`
}

export function apiPath(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`
  return withBasePath(normalizedPath.startsWith("/api") ? normalizedPath : `/api${normalizedPath}`)
}

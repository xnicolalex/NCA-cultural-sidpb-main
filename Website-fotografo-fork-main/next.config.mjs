/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "")

const nextConfig = {
  ...(basePath ? { basePath } : {}),
  // Permite conexões externas (WebSockets/HMR) no modo Dev dentro do Docker
  allowedDevOrigins: [
    'localhost:3001',
    'localhost:3000',
    '192.168.200.186'
  ],
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}
export default nextConfig

// Redirecionamentos
// Variáveis de ambiente públicas
// Domínios externos de imagem
// Headers customizados
// Modo de saída

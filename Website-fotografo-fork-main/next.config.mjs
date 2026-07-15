/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/cultura',
  trailingSlash: true,
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

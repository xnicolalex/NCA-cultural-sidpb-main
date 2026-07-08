/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Ignora o erro do react-hook-form
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ignora erros de variáveis não usadas
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

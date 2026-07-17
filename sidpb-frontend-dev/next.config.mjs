const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "");

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/sidpb",
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

if (basePath) {
  nextConfig.basePath = basePath;
}

export default nextConfig;
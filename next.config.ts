import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/growup',      // ← nama repository Anda
  assetPrefix: '/growup/',  // ← nama repository Anda
  trailingSlash: true,
};

export default nextConfig;
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/growup',
  assetPrefix: '/growup/',
  trailingSlash: true,
};

export default nextConfig;
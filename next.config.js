/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  ...(isProduction
    ? {
        basePath: '/growup',
        assetPrefix: '/growup/',
      }
    : {}),
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
};

module.exports = nextConfig;

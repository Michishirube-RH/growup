/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/growup',
  assetPrefix: '/growup/',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
};

module.exports = nextConfig;
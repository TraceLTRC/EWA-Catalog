/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '**',
      }
    ],
    minimumCacheTTL: 28800,
  },
  staticPageGenerationTimeout: 1000,
}

module.exports = nextConfig
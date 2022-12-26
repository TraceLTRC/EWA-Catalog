// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'firebasestorage.googleapis.com',
//         port: '',
//         pathname: '**',
//       }
//     ]
//   },
//   staticPageGenerationTimeout: 1000,
// }

// module.exports = nextConfig

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer({})
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
          {
            hostname: 'cdn.myanimelist.net',
          },
        ],
      },
}

module.exports = nextConfig

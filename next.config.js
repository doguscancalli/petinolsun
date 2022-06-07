/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['ui-avatars.com', 'res.cloudinary.com'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  module: {
    rules: [
      {
        test: /\.graphqls$/,
        exclude: /node_modules/,
        use: ['webpack-graphql-loader'],
      },
    ],
  },
}

module.exports = nextConfig

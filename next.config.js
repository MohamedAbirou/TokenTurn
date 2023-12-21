/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["assets.coingecko.com"],
  },
};

module.exports = nextConfig;

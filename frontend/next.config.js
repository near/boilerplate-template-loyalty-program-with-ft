/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  env: {
    CONTRACT_NAME: process.env.CONTRACT_NAME,
  },
};

module.exports = nextConfig;

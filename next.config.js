/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  transpilePackages: ["lucide-react"],
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;

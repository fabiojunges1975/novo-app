/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  // Configurações otimizadas para Vercel
  poweredByHeader: false,
  compress: true,
  generateEtags: true,
  // Output standalone para melhor performance na Vercel
  output: 'standalone',
}

module.exports = nextConfig

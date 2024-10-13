/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@node-rs/argon2', '@node-rs/bcrypt'],
  },
}

export default nextConfig

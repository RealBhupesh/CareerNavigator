/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    // Only apply rewrites in development
    if (process.env.NODE_ENV === 'development') {
      return [
        {
          source: '/pyapi/:path*',
          destination: 'http://127.0.0.1:8000/:path*',
        },
      ]
    }
    // In production (Vercel), the rewrites are handled by vercel.json
    return []
  },
}

export default nextConfig



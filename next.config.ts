import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  cacheComponents: true,
  devIndicators: process.env.TEST_API_MOCKING === 'true' ? false : undefined,
}

export default nextConfig

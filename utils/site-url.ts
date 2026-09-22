export function getSiteUrl() {
  const url = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL

  if (url) {
    return `https://${url}`
  }

  return 'http://localhost:3000'
}

export function getSiteUrl() {
  const url = process.env.NEXT_PUBLIC_VERCEL_URL

  if (url) {
    return `https://${url}`
  }

  return 'http://localhost:3000'
}

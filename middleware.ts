import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const secFetchSite = request.headers.get('sec-fetch-site')

  const isSameSite =
    secFetchSite === 'same-origin' || secFetchSite === 'same-site'

  if (!isSameSite) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/api/:path*',
}

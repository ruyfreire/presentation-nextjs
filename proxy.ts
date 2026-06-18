import { NextRequest, NextResponse } from 'next/server'

export function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)

  if (process.env.API_TOKEN) {
    requestHeaders.set('Authorization', process.env.API_TOKEN)
  }

  const urlBackend = request.nextUrl.pathname.replace('/api', '');
  const urlDestino = new URL(urlBackend, process.env.NEXT_PUBLIC_API_URL);
  urlDestino.search = request.nextUrl.search;

  return NextResponse.rewrite(urlDestino, {
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: '/api/:path*',
}

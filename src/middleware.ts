import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { nextUrl } = request
  const pathname = nextUrl.pathname
  const lower = pathname.toLowerCase()

  if (pathname !== lower) {
    const url = nextUrl.clone()
    url.pathname = lower
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/:path*',
}

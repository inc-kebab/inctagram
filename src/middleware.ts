import { AppRoutes } from '@/shared/const/routes'
import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('accessToken')?.value

  const isPublicRoute =
    req.nextUrl.pathname.startsWith('/auth') ||
    req.nextUrl.pathname === '/' ||
    req.nextUrl.pathname.startsWith('/public')

  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL(AppRoutes.HOME, req.url))
  }

  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL(AppRoutes.MAIN, req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    {
      missing: [
        { key: 'next-router-prefetch', type: 'header' },
        { key: 'purpose', type: 'header', value: 'prefetch' },
      ],
      source: '/((?!api|_next/static|_next/image|favicon.ico|assets/images|general).*)',
    },
  ],
}

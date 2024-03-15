import { AppRoutes } from '@/shared/const/routes'
import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const localeCookie = req.cookies.get('NEXT_LOCALE')?.value
  const params = req.nextUrl.searchParams.toString()
  const token = req.cookies.get('accessToken')?.value
  const nextUrlPath = req.nextUrl.pathname

  const isNeedChangeRouteLocale = localeCookie && req.nextUrl.locale !== localeCookie

  const isGeneralRoute = nextUrlPath.startsWith('/general/')

  const isPublicRoute = nextUrlPath.startsWith('/auth/') || nextUrlPath === '/'

  if (token && isPublicRoute && !isGeneralRoute) {
    if (isNeedChangeRouteLocale) {
      return NextResponse.redirect(new URL(`/${localeCookie}${AppRoutes.HOME}?${params}`, req.url))
    } else {
      return NextResponse.redirect(new URL(`${AppRoutes.HOME}?${params}`, req.url))
    }
  }

  if (!token && !isPublicRoute && !isGeneralRoute) {
    if (isNeedChangeRouteLocale) {
      return NextResponse.redirect(new URL(`/${localeCookie}${AppRoutes.MAIN}?${params}`, req.url))
    } else {
      return NextResponse.redirect(new URL(`${AppRoutes.MAIN}?${params}`, req.url))
    }
  }

  if (isNeedChangeRouteLocale) {
    return NextResponse.redirect(new URL(`/${localeCookie}${nextUrlPath}?${params}`, req.url))
  }

  req.cookies.set('NEXT_LOCALE', req.nextUrl.locale)

  return NextResponse.next()
}

export const config = {
  matcher: [
    {
      missing: [
        { key: 'next-router-prefetch', type: 'header' },
        { key: 'purpose', type: 'header', value: 'prefetch' },
      ],
      source: '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
    },
  ],
}

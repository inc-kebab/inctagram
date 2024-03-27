import { AppRoutes } from '@/shared/const/routes'
import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const localeCookie = req.cookies.get('NEXT_LOCALE')?.value
  const params = req.nextUrl.searchParams.toString()
  const token = req.cookies.get('accessToken')?.value
  const nextUrlPath = req.nextUrl.pathname

  const isLocaleDiffer = !!localeCookie && req.nextUrl.locale !== localeCookie

  const isGeneral = nextUrlPath.startsWith('/general/')

  const isPublic = nextUrlPath.startsWith('/auth/') || nextUrlPath === '/'

  if (isGeneral) {
    if (isLocaleDiffer) {
      return NextResponse.redirect(new URL(`/${localeCookie}${nextUrlPath}?${params}`, req.url))
    } else {
      return NextResponse.next()
    }
  }

  if (token && isPublic) {
    if (isLocaleDiffer) {
      return NextResponse.redirect(new URL(`/${localeCookie}${AppRoutes.HOME}?${params}`, req.url))
    } else {
      return NextResponse.redirect(new URL(`${AppRoutes.HOME}?${params}`, req.url))
    }
  }

  if (!token && !isPublic) {
    if (isLocaleDiffer) {
      return NextResponse.redirect(new URL(`/${localeCookie}${AppRoutes.MAIN}`, req.url))
    } else {
      return NextResponse.redirect(new URL(`${AppRoutes.MAIN}`, req.url))
    }
  }

  if (isLocaleDiffer) {
    return NextResponse.redirect(new URL(`/${localeCookie}${nextUrlPath}?${params}`, req.url))
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
      source: '/((?!api|_next/static|_next/image|favicon.ico|assets/images).*)',
    },
  ],
}

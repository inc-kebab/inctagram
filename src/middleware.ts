import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const localeCookie = req.cookies.get('NEXT_LOCALE')?.value

  const params = req.nextUrl.searchParams.toString()

  if (localeCookie && req.nextUrl.locale !== localeCookie) {
    return NextResponse.redirect(
      new URL(`/${localeCookie}${req.nextUrl.pathname}?${params}`, req.url)
    )
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
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
    },
  ],
}

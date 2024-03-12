import { PropsWithChildren, useLayoutEffect } from 'react'

import { useMeQuery } from '@/feature/auth'
import { AppRoutes, AuthRoutes } from '@/shared/const/routes'
import { Loader } from '@/shared/ui/Loader'
import { getCookie } from 'cookies-next'
import { useRouter } from 'next/router'

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { asPath, push } = useRouter()

  const { isLoading } = useMeQuery()

  // TODO profile - public, profile-settings - protect
  const isNoAuthRoute = asPath.startsWith('/auth') || asPath === '/'

  const isProtectProfilePage = asPath === 'profile/settings'

  const isPublicRoute = asPath.startsWith(AuthRoutes.PRIVACY) || asPath.startsWith(AuthRoutes.TERMS)

  const token = getCookie('accessToken')

  // TODO push to error page
  useLayoutEffect(() => {
    if (!token && !isNoAuthRoute && !isPublicRoute && isProtectProfilePage) {
      void push(AppRoutes.MAIN)
    }

    if (token && isNoAuthRoute && !isPublicRoute) {
      void push(AppRoutes.HOME)
    }
  }, [token, isNoAuthRoute, push, isPublicRoute, isProtectProfilePage])

  return isLoading ? <Loader fullHeight /> : <>{children}</>
}

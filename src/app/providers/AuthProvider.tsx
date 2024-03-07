import { PropsWithChildren, useLayoutEffect } from 'react'

import { useMeQuery } from '@/feature/auth'
import { AppRoutes } from '@/shared/const/routes'
import { Loader } from '@/shared/ui/Loader'
import { getCookie } from 'cookies-next'
import { useRouter } from 'next/router'

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { asPath, push } = useRouter()

  const { isLoading } = useMeQuery()

  // TODO profile - public, profile-settings - protect
  const isPublicRoute = asPath.startsWith('/auth') || asPath === '/'

  const token = getCookie('accessToken')

  // TODO push to error page
  useLayoutEffect(() => {
    if (!token && !isPublicRoute) {
      void push(AppRoutes.MAIN)
    }

    if (token && isPublicRoute) {
      void push(AppRoutes.HOME)
    }
  }, [token, isPublicRoute, push])

  return isLoading ? <Loader fullHeight /> : <>{children}</>
}

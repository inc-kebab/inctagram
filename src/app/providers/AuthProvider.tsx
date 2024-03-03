import { PropsWithChildren, useEffect } from 'react'

import { useMeQuery } from '@/feature/auth'
import { AppRoutes, AuthRoutes } from '@/shared/const/routes'
import { Loader } from '@/shared/ui/Loader'
import { useRouter } from 'next/router'

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { asPath, push } = useRouter()

  const { data, isLoading } = useMeQuery()

  // TODO profile - public, profile-settings - protect
  const isPublicRoute = asPath.startsWith('/auth') || asPath === '/'

  // TODO push to error page
  useEffect(() => {
    if (!data && !isPublicRoute) {
      void push(AuthRoutes.SIGN_IN)
    }

    if (data && isPublicRoute) {
      void push(AppRoutes.HOME)
    }
  }, [data, isPublicRoute, push])

  return isLoading ? <Loader fullHeight /> : <>{children}</>
}

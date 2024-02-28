import { PropsWithChildren, useEffect } from 'react'

import { useMeQuery } from '@/feature/auth/api/auth-api'
import { AppRoutes, AuthRoutes } from '@/shared/const/routes'
import { Loader } from '@/shared/ui/Loader'
import { useRouter } from 'next/router'

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { asPath, pathname, push } = useRouter()

  const { data, isError, isLoading } = useMeQuery()

  const isPublicRoute = asPath.startsWith('/auth') || pathname === '/'

  useEffect(() => {
    if (!data && !isPublicRoute) {
      void push(AuthRoutes.SIGN_IN)
    }

    if (data && isPublicRoute) {
      void push(AppRoutes.HOME)
    }
  }, [data, isPublicRoute, push])

  if (isError) {
    void push(AuthRoutes.SIGN_IN)

    return <></>
  }

  return isLoading ? <Loader fullHeight /> : <>{children}</>
}

import { PropsWithChildren, useLayoutEffect } from 'react'
import { toast } from 'react-toastify'

import { useMeQuery } from '@/feature/auth/api/auth-api'
import { AppRoutes, PublicRoutes } from '@/shared/const/routes'
import { Loader } from '@/shared/ui/Loader'
import { useRouter } from 'next/router'

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter()
  const { data, isLoading } = useMeQuery() //rtk query hook

  const isProtectedPage = !PublicRoutes.includes(router.pathname)

  useLayoutEffect(() => {
    if (!isLoading && !data && isProtectedPage) {
      router.push(AppRoutes.MAIN)
      toast.warning('Please, sign in')
    } else if (!isLoading && data && !isProtectedPage) {
      router.push(AppRoutes.HOME)
      toast.warning('You are already sign in')
    }
  }, [isLoading, isProtectedPage, router, data])

  return isLoading ? <Loader fullHeight /> : <>{children}</>
}

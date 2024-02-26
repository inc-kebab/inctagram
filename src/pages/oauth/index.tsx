import { useEffect } from 'react'

import { useMeQuery } from '@/feature/auth/api/auth-api'
import { AppRoutes, AuthRoutes } from '@/shared/const/routes'
import { Page } from '@/shared/types/layout'
import { Loader } from '@/shared/ui/Loader'
import { useRouter } from 'next/router'

const OAuth: Page = () => {
  const { data } = useMeQuery()

  const router = useRouter()

  const { token } = router.query

  useEffect(() => {
    if (!data && !token) {
      router.push(AuthRoutes.SIGN_IN)
    } else {
      router.push(AppRoutes.HOME)
    }
  }, [data, token, router])

  return <Loader fullHeight />
}

export default OAuth

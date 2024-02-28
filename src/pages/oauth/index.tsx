import { useEffect } from 'react'
import { toast } from 'react-toastify'

import { useMeQuery } from '@/feature/auth/api/auth-api'
import { AppRoutes, AuthRoutes } from '@/shared/const/routes'
import { Page } from '@/shared/types/layout'
import { Loader } from '@/shared/ui/Loader'
import { useRouter } from 'next/router'

const OAuth: Page = () => {
  /*    const { data } = useMeQuery()

  const router = useRouter()

  useEffect(() => {
    if (!data) {
      router.push(AuthRoutes.SIGN_IN)
      toast.error('Something went wrong. Try it again.')
    } else {
      router.push(AppRoutes.HOME)
      toast.success('Welcome!')
    }
  }, [data, router])*/

  return <Loader fullHeight />
}

export default OAuth

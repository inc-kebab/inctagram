import { useEffect } from 'react'

import { useMeQuery } from '@/feature/auth/api/auth-api'
import { AppRoutes } from '@/shared/const/routes'
import { Loader } from '@/shared/ui/Loader'
import { setCookie } from 'cookies-next'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'

const RedirectProvider = () => {
  const { query, replace } = useRouter()

  const params = useSearchParams()

  const { data } = useMeQuery()

  useEffect(() => {
    if (query.provider) {
      if (query.provider !== 'credentials') {
        const token = params?.get('code')

        if (token) {
          setCookie('accessToken', token)
        }
      }

      if (data) {
        void replace(AppRoutes.HOME)
      } else {
        void replace(AppRoutes.MAIN)
      }
    }
  }, [query.provider, data, params, replace])

  return <Loader fullHeight />
}

export default RedirectProvider

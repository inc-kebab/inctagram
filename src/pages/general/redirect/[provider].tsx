import { useEffect } from 'react'

import { useMeQuery } from '@/feature/auth/api/auth-api'
import { AppRoutes } from '@/shared/const/routes'
import { Loader } from '@/shared/ui/Loader'
import { getCookie, setCookie } from 'cookies-next'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'

const RedirectProvider = () => {
  const { query, replace } = useRouter()

  const params = useSearchParams()

  const { data } = useMeQuery()

  useEffect(() => {
    if (query.provider) {
      let token

      if (query.provider !== 'credentials') {
        token = params?.get('code')

        if (token) {
          setCookie('accessToken', token, { maxAge: 30 * 60 }) // 30min
        }
      } else {
        token = getCookie('accessToken')
      }

      if (token) {
        void replace(AppRoutes.PROFILE)
      } else {
        void replace(AppRoutes.MAIN)
      }
    }
  }, [query.provider, params, replace])

  return <Loader fullHeight />
}

export default RedirectProvider

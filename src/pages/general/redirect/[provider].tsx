import { useEffect } from 'react'

import { useLazyMeQuery } from '@/feature/auth'
import { AppRoutes } from '@/shared/const/routes'
import { Loader } from '@/shared/ui/Loader'
import { deleteCookie, getCookie, setCookie } from 'cookies-next'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'

const RedirectProvider = () => {
  const { asPath, locale, push, query } = useRouter()

  const params = useSearchParams()

  const [getMe] = useLazyMeQuery()

  useEffect(() => {
    if (query.provider) {
      let token: Nullable<string | undefined>

      if (query.provider !== 'credentials') {
        token = params?.get('code')

        if (token) {
          setCookie('accessToken', token, { maxAge: 30 * 60 }) // 30min
        }
      } else {
        token = getCookie('accessToken')
      }

      getMe().then(res => {
        if ('data' in res && token) {
          void push(AppRoutes.PROFILE, asPath, { locale })
        } else {
          deleteCookie('accessToken')
          void push(AppRoutes.MAIN, asPath, { locale })
        }
      })
    }
  }, [query.provider, params, push, getMe, asPath, locale])

  return <Loader fullHeight />
}

export default RedirectProvider

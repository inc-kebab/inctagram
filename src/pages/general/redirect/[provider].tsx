import { useEffect } from 'react'

import { AppRoutes } from '@/shared/const/routes'
import { Loader } from '@/shared/ui/Loader'
import { setCookie } from 'cookies-next'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'

const RedirectProvider = () => {
  const { query, replace } = useRouter()

  const params = useSearchParams()

  useEffect(() => {
    if (query.provider) {
      let token: Nullable<string | undefined>
      let userId: Nullable<string | undefined>

      if (query.provider !== 'credentials') {
        token = params?.get('code')
        userId = params?.get('userId')

        if (token) {
          setCookie('accessToken', token, { maxAge: 30 * 60 }) // 30min

          const message = JSON.stringify({ action: 'success_sign-in' })

          localStorage.setItem('sign-in', message)

          void replace(AppRoutes.PROFILE + `/${userId}`, AppRoutes.PROFILE + `/${userId}`)
        } else {
          void replace(AppRoutes.MAIN, AppRoutes.MAIN)
        }
      }
    }
  }, [query.provider, params, replace])

  return <Loader fullHeight size={200} />
}

export default RedirectProvider

import { useEffect } from 'react'

import { Loader } from '@/shared/ui/Loader'
import { setCookie } from 'cookies-next'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'

const RedirectProvider = () => {
  const { query } = useRouter()

  const params = useSearchParams()

  useEffect(() => {
    if (query.provider) {
      let token: Nullable<string | undefined>

      if (query.provider !== 'credentials') {
        token = params?.get('code')

        if (token) {
          setCookie('accessToken', token, { maxAge: 30 * 60 }) // 30min
        }
      }
    }
  }, [query.provider, params])

  return <Loader fullHeight />
}

export default RedirectProvider

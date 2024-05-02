import { useEffect } from 'react'

import { useMeQuery } from '@/feature/auth'
import { AppRoutes } from '@/shared/const/routes'
import { Loader } from '@/shared/ui/Loader'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'

const RedirectProvider = () => {
  const { replace } = useRouter()

  const params = useSearchParams()

  const { data } = useMeQuery(undefined)

  useEffect(() => {
    if (data) {
      const success = params?.get('success')

      const baseUrl = AppRoutes.PROFILE + `/${data.id}` + AppRoutes.PROFILE_SETTINGS

      if (success) {
        void replace(
          { pathname: baseUrl, query: { success, tab: 'management' } },
          { pathname: baseUrl, query: { success, tab: 'management' } }
        )
      }
    }
  }, [data, params, replace])

  return <Loader fullHeight size={200} />
}

export default RedirectProvider

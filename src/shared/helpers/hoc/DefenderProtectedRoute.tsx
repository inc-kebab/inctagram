import { useEffect } from 'react'

import { useMeQuery } from '@/feature/auth'
import { AuthRoutes } from '@/shared/const/routes'
import { useTranslation } from '@/shared/hooks'
import { Page } from '@/shared/types/layout'
import { Loader } from '@/shared/ui/Loader'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'

export const DefenderProtectedRoute = (Page: Page) => {
  const Component = ({ pageProps }: AppProps) => {
    const { push } = useRouter()

    const { data, isError, isFetching } = useMeQuery(undefined)

    const { t } = useTranslation()

    const getLayout = Page.getLayout ?? (page => page)

    useEffect(() => {
      if (isError) {
        void push(AuthRoutes.SIGN_IN)
      }
    }, [data, push, isError])

    if (!data || isFetching) {
      return <Loader fullHeight size={200} />
    }

    return getLayout(<Page {...pageProps} />, t)
  }

  return Component
}

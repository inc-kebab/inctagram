import { useEffect } from 'react'

import { useMeQuery } from '@/feature/auth'
import { AppRoutes } from '@/shared/const/routes'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Page } from '@/shared/types/layout'
import { Loader } from '@/shared/ui/Loader'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'

export const DefenderAuthRoute = (Page: Page) => {
  const Component = ({ pageProps }: AppProps) => {
    const { push } = useRouter()

    const { t } = useTranslation()

    const getLayout = Page.getLayout ?? (page => page)

    const { currentData, data, isFetching } = useMeQuery()

    useEffect(() => {
      if (data || currentData) {
        void push(AppRoutes.MY_PROFILE)
      }
    }, [data, push, currentData])

    if (currentData || data) {
      return null
    }

    if (isFetching) {
      return <Loader fullHeight />
    }

    return getLayout(<Page {...pageProps} />, t)
  }

  return Component
}

import { useTranslation } from '@/shared/hooks'
import { Page } from '@/shared/types/layout'
import { AppProps } from 'next/app'

export const DefenderPublicRoute = (Page: Page) => {
  const Component = ({ pageProps }: AppProps) => {
    const { t } = useTranslation()

    const getLayout = Page.getLayout ?? (page => page)

    return getLayout(<Page {...pageProps} />, t)
  }

  return Component
}

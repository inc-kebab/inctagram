import type { AppProps } from 'next/app'

import { useEffect } from 'react'
import { Provider } from 'react-redux'

import { ErrorBoundary, store } from '@/app'
import { useLoader } from '@/shared/hooks/useLoader'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Page } from '@/shared/types/layout'
import { ToastProvider } from '@/widgets/toast'
import { setCookie } from 'cookies-next'
import { Inter } from 'next/font/google'

import 'react-toastify/dist/ReactToastify.css'
import '@/app/styles/nprogress.scss'
import '@/app/styles/index.scss'

type Props = AppProps & {
  Component: Page
}

const inter = Inter({ subsets: ['latin', 'cyrillic'], weight: ['400', '600', '700'] })

export default function App({ Component, pageProps }: Props) {
  useLoader()

  const { locale, t } = useTranslation()

  const getLayout = Component.getLayout ?? (page => page)

  useEffect(() => {
    setCookie('NEXT_LOCALE', locale, { maxAge: 100 * 365 * 24 * 60 * 60 }) // 1year
  }, [locale])

  return (
    <Provider store={store}>
      <ErrorBoundary>
        {getLayout(<Component className={inter.className} {...pageProps} />, t)}
        <ToastProvider />
      </ErrorBoundary>
    </Provider>
  )
}

import type { AppProps } from 'next/app'

import { Fragment } from 'react'
import { Provider } from 'react-redux'

import { AuthProvider, ErrorBoundary, store } from '@/app'
import { useLoader } from '@/shared/hooks/useLoader'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Page } from '@/shared/types/layout'
import { ToastProvider } from '@/widgets/toast'
import { Inter } from 'next/font/google'

import '@/app/styles/index.scss'
import '@/app/styles/nprogress.scss'
import 'react-toastify/dist/ReactToastify.css'

type Props = AppProps & {
  Component: Page
}

const inter = Inter({ subsets: ['latin', 'cyrillic'], weight: ['400', '600', '700'] })

export default function App({ Component, pageProps }: Props) {
  useLoader()

  const { t } = useTranslation()

  const getLayout = Component.getLayout ?? (page => page)
  const Layout = Component.layout ?? Fragment

  return (
    <Provider store={store}>
      <ErrorBoundary>
        <AuthProvider>
          <Layout>{getLayout(<Component className={inter.className} {...pageProps} />, t)}</Layout>
          <ToastProvider />
        </AuthProvider>
      </ErrorBoundary>
    </Provider>
  )
}

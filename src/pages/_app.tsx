import type { AppProps } from 'next/app'

import { Fragment } from 'react'
import { Provider } from 'react-redux'

import { store } from '@/app'
import { AuthProvider } from '@/app/providers/AuthProvider'
import { useLoader } from '@/shared/hooks/useLoader'
import { Page } from '@/shared/types/layout'
import { ToastProvider } from '@/widgets/toast'
import { SessionProvider } from 'next-auth/react'

import '@/app/styles/index.scss'
import '@/app/styles/nprogress.scss'
import '@fontsource/inter/400.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import 'react-toastify/dist/ReactToastify.css'

type Props = AppProps & {
  Component: Page
}

export default function App({ Component, pageProps }: Props) {
  useLoader()

  const getLayout = Component.getLayout ?? (page => page)
  const Layout = Component.layout ?? Fragment

  return (
    <Provider store={store}>
      <AuthProvider>
        <SessionProvider>
          <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
          <ToastProvider />
        </SessionProvider>
      </AuthProvider>
    </Provider>
  )
}

import type { AppProps } from 'next/app'

import { useEffect } from 'react'
import { Provider } from 'react-redux'

import { ErrorBoundary, wrapper } from '@/app'
import { initDB } from '@/entities/post'
import { useLoader } from '@/shared/hooks'
import { Page } from '@/shared/types/layout'
import { ToastProvider } from '@/widgets/toast'
import { setCookie } from 'cookies-next'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'

import 'react-toastify/dist/ReactToastify.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import '@/shared/ui/Carousel/Carousel.scss'
import '@/app/styles/nprogress.scss'
import '@/app/styles/index.scss'

type Props = AppProps & {
  Component: Page
}

const inter = Inter({ subsets: ['latin', 'cyrillic'], weight: ['400', '600', '700'] })

export function App({ Component, pageProps }: Props) {
  const { props, store } = wrapper.useWrappedStore(pageProps)

  useLoader()

  const { locale } = useRouter()

  useEffect(() => {
    setCookie('NEXT_LOCALE', locale, { maxAge: 100 * 365 * 24 * 60 * 60 }) // 1year
  }, [locale])

  useEffect(() => {
    void initDB()
  }, [])

  return (
    <Provider store={store}>
      <ErrorBoundary>
        <Component className={inter.className} {...props} />
        <ToastProvider />
      </ErrorBoundary>
    </Provider>
  )
}

export default App

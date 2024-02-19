import type { AppProps } from 'next/app'

import { useLoader } from '@/shared/hooks'
import { ToastProvider } from '@/widgets/toast'

import 'react-toastify/dist/ReactToastify.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@/app/styles/nprogress.scss'
import '@/app/styles/index.scss'

export default function App({ Component, pageProps }: AppProps) {
  useLoader()

  return (
    <>
      <Component {...pageProps} />
      <ToastProvider />
    </>
  )
}

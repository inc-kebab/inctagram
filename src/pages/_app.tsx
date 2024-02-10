import type { AppProps } from 'next/app'

import { useLoader } from '@/shared/hooks'

import '@fontsource/inter/400.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@/app/styles/index.scss'
import '@/app/styles/nprogress.scss'

export default function App({ Component, pageProps }: AppProps) {
  useLoader()

  return <Component {...pageProps} />
}

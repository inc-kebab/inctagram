import type { AppProps } from 'next/app'

import { useLoader } from '@/shared/hooks'

import '@/app/styles/index.scss'
import '@/app/styles/nprogress.scss'

export default function App({ Component, pageProps }: AppProps) {
  useLoader()

  return <Component {...pageProps} />
}

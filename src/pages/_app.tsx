import type { AppProps } from 'next/app'

import { Provider } from 'react-redux'

import { store } from '@/app'
import { useLoader } from '@/shared/hooks'
import { ToastProvider } from '@/widgets/toast'

import 'react-toastify/dist/ReactToastify.css'
import '@/app/styles/index.scss'
import '@/app/styles/nprogress.scss'
import '@fontsource/inter/400.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'

export default function App({ Component, pageProps }: AppProps) {
  useLoader()

  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <ToastProvider />
    </Provider>
  )
}

import { useEffect } from 'react'

import { en, ru } from '@/../locales'
import { getCookie, setCookie } from 'cookies-next'
import { useRouter } from 'next/router'

export const useTranslation = () => {
  const router = useRouter()

  useEffect(() => {
    const localeCookie = getCookie('NEXT_LOCALE')

    if (!localeCookie) {
      setCookie('NEXT_LOCALE', router.locale, { maxAge: 100 * 365 * 24 * 60 * 60 }) // 1year
    }
  }, [])

  return { locale: router.locale, t: router.locale === 'ru' ? ru : en }
}

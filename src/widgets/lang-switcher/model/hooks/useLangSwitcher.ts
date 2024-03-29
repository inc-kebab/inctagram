import { setCookie } from 'cookies-next'
import { useRouter } from 'next/router'

export const useLangSwitcher = () => {
  const { asPath, defaultLocale, locale, pathname, query, replace } = useRouter()

  const changeLocale = (locale: string) => {
    setCookie('NEXT_LOCALE', locale, { maxAge: 100 * 365 * 24 * 60 * 60 })
    void replace({ pathname, query }, asPath, {
      locale,
    })
  }

  return { changeLocale, defaultLocale, locale }
}

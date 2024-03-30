import { useRouter } from 'next/router'

export const useLangSwitcher = () => {
  const { asPath, defaultLocale, locale, pathname, query, replace } = useRouter()

  const changeLocale = (locale: string) => {
    void replace({ pathname, query }, asPath, { locale })
  }

  return { changeLocale, defaultLocale, locale }
}

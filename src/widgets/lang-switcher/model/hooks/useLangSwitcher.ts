import { useRouter } from 'next/router'

export const useLangSwitcher = () => {
  const { asPath, locale, pathname, push, query, replace } = useRouter()

  const changeLocale = (locale: string) => {
    void replace({ pathname, query }, asPath, {
      locale,
    })
  }

  return { changeLocale, locale }
}

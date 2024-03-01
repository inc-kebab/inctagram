import { useRouter } from 'next/router'

export const useLangSwitcher = () => {
  const { asPath, locale, pathname, push, query } = useRouter()

  const changeLocale = (locale: string) => {
    void push({ pathname, query }, asPath, {
      locale,
    })
  }

  return { changeLocale, locale }
}

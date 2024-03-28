import { en, ru } from '@/../locales'
import { useRouter } from 'next/router'

export const useTranslation = () => {
  const router = useRouter()

  return { locale: router.locale, t: router.locale === 'ru' ? ru : en }
}

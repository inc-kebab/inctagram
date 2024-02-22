import { RuIcon, UkIcon } from '@/shared/assets/icons/lang'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Select } from '@/shared/ui/Select'
import { useRouter } from 'next/router'

import s from './LangSwitcherSelect.module.scss'

export const LangSwitcherSelect = () => {
  const { asPath, locale, pathname, push, query } = useRouter()

  const { t } = useTranslation()

  const SELECT_OPTIONS = [
    {
      icon: <RuIcon />,
      name: t.lang.ru,
      value: 'ru',
    },
    {
      icon: <UkIcon />,
      name: t.lang.en,
      value: 'en',
    },
  ]

  const changeLocale = (locale: string) => {
    push({ pathname, query }, asPath, {
      locale,
    })
  }

  return (
    <Select
      className={s.root}
      defaultValue={locale || 'en'}
      onValueChange={changeLocale}
      options={SELECT_OPTIONS}
    />
  )
}

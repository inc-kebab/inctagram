import { RuIcon, UkIcon } from '@/shared/assets/icons/lang'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Select } from '@/shared/ui/Select'
import clsx from 'clsx'

import s from './LangSwitcher.module.scss'

import { useLangSwitcher } from '../../model/hooks/useLangSwitcher'

interface Props {
  className?: string
}

export const LangSwitcher = ({ className }: Props) => {
  const { changeLocale, locale } = useLangSwitcher()

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

  return (
    <Select
      className={clsx(s.root, className)}
      defaultValue={locale || 'en'}
      onValueChange={changeLocale}
      options={SELECT_OPTIONS}
    />
  )
}

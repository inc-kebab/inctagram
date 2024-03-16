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
  const { changeLocale, defaultLocale, locale } = useLangSwitcher()

  const { t } = useTranslation()

  const SELECT_OPTIONS = [
    {
      icon: <RuIcon />,
      name: <span className={s.text}>{t.lang.ru}</span>,
      value: 'ru',
    },
    {
      icon: <UkIcon />,
      name: <span className={s.text}>{t.lang.en}</span>,
      value: 'en',
    },
  ]

  return (
    <Select
      className={clsx(s.root, className)}
      classNames={{ icon: s.icon, trigger: s.trigger }}
      defaultValue={locale || defaultLocale}
      onValueChange={changeLocale}
      options={SELECT_OPTIONS}
    />
  )
}

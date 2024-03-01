import { RuIcon, UkIcon } from '@/shared/assets/icons/lang'
import { Select } from '@/shared/ui/Select'
import clsx from 'clsx'

import s from './MobileLangSwitcher.module.scss'

import { useLangSwitcher } from '../../model/hooks/useLangSwitcher'

interface Props {
  className?: string
}

export const MobileLangSwitcher = ({ className }: Props) => {
  const { changeLocale, locale } = useLangSwitcher()

  const SELECT_OPTIONS = [
    {
      icon: <RuIcon />,
      value: 'ru',
    },
    {
      icon: <UkIcon />,
      value: 'en',
    },
  ]

  return (
    <Select
      className={clsx(s.mobileRoot, className)}
      classNameTrigger={s.mobileTrigger}
      classNameViewport={s.mobileViewport}
      defaultValue={locale || 'en'}
      onValueChange={changeLocale}
      options={SELECT_OPTIONS}
      pagination
    />
  )
}

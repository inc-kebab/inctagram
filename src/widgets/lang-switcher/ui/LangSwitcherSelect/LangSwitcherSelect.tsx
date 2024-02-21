import { RuIcon, UkIcon } from '@/shared/assets/icons/lang'
import { Select } from '@/shared/ui/Select'

import s from './LangSwitcherSelect.module.scss'

const SELECT_OPTIONS = [
  {
    icon: <RuIcon />,
    value: 'Russian',
  },
  {
    icon: <UkIcon />,
    value: 'English',
  },
]

export const LangSwitcherSelect = () => {
  return <Select className={s.root} defaultValue="Russian" options={SELECT_OPTIONS} />
}

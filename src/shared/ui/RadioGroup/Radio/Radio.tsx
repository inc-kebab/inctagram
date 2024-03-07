import { ComponentPropsWithoutRef, ReactNode } from 'react'

import * as RadixRadio from '@radix-ui/react-radio-group'
import clsx from 'clsx'

import s from './Radio.module.scss'

type Props = {
  label: ReactNode
} & Omit<ComponentPropsWithoutRef<typeof RadixRadio.Item>, 'asChild'>

export const Radio = ({ className, disabled, label, ...rest }: Props) => {
  return (
    <label className={clsx(s.labelWrapper, { [s.disabled]: disabled }, className)}>
      <RadixRadio.Item className={s.item} disabled={disabled} {...rest}>
        <RadixRadio.Indicator className={s.indicator} />
      </RadixRadio.Item>
      {label}
    </label>
  )
}

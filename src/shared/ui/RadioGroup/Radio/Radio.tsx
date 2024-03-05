import { ComponentPropsWithoutRef } from 'react'

import * as RadixRadio from '@radix-ui/react-radio-group'
import clsx from 'clsx'

import s from './Radio.module.scss'

import { Typography } from '../../Typography'

type Props = {
  label: string
} & Omit<ComponentPropsWithoutRef<typeof RadixRadio.Item>, 'asChild'>

export const Radio = ({ className, disabled, label, ...rest }: Props) => {
  return (
    <Typography
      asComponent="label"
      className={clsx(s.labelWrapper, { [s.disabled]: disabled }, className)}
      variant="regular16"
    >
      <RadixRadio.Item className={s.item} disabled={disabled} {...rest}>
        <RadixRadio.Indicator className={s.indicator} />
      </RadixRadio.Item>
      {label}
    </Typography>
  )
}

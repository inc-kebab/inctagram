import React, { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react'

import { Check } from '@/shared/assets/icons/common'
import * as CheckboxRadix from '@radix-ui/react-checkbox'
import clsx from 'clsx'

import s from './Checkbox.module.scss'

export type CheckboxProps = {
  label?: ReactNode | string
} & ComponentPropsWithoutRef<typeof CheckboxRadix.Root>

export type Ref = ElementRef<typeof CheckboxRadix.Indicator>

export const Checkbox = forwardRef<Ref, CheckboxProps>(({ checked, disabled, label, ...rest }) => {
  const cNames = {
    indicator: clsx(s.indicator, { [s.disabled]: disabled }),
    label: clsx(s.label, { [s.disabled]: disabled }),
  }

  return (
    <div className={s.container}>
      <label className={cNames.label}>
        <CheckboxRadix.Root checked={checked} className={s.checkbox} disabled={disabled} {...rest}>
          {checked && (
            <CheckboxRadix.Indicator className={cNames.indicator}>
              <Check className={disabled ? s.checkIconDisabled : s.checkIcon} />
            </CheckboxRadix.Indicator>
          )}
        </CheckboxRadix.Root>
        {label}
      </label>
    </div>
  )
})

import React, { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react'

import { Check } from '@/shared/assets/icons/common'
import * as CheckboxRadix from '@radix-ui/react-checkbox'
import clsx from 'clsx'

import s from './Checkbox.module.scss'

export type CheckboxProps = {
  checked?: boolean
  disabled?: boolean
  label?: ReactNode | string
  onCheckedChange: (checked: boolean) => void
} & ComponentPropsWithoutRef<typeof CheckboxRadix.Root>

export type Ref = ElementRef<typeof CheckboxRadix.Indicator>

export const Checkbox = forwardRef<Ref, CheckboxProps>(
  ({ checked = false, disabled = false, label, onCheckedChange, ...rest }) => {
    const cNames = {
      checkbox: clsx(s.checkbox, { [s.checked]: checked, [s.disabled]: disabled }),
      checkboxWrapper: clsx(s.checkboxWrapper, { [s.disabled]: disabled }),
      container: s.container,
      indicator: clsx(s.indicator, { [s.disabled]: disabled }),
      label: clsx(s.label, { [s.disabled]: disabled }),
    }

    return (
      <div className={cNames.container}>
        <label className={cNames.label}>
          <div className={cNames.checkboxWrapper}>
            <CheckboxRadix.Root
              checked={checked}
              className={cNames.checkbox}
              disabled={disabled}
              onCheckedChange={onCheckedChange}
              {...rest}
            >
              {checked && (
                <CheckboxRadix.Indicator className={cNames.indicator}>
                  <Check className={disabled ? s.checkIconDisabled : s.checkIcon} />
                </CheckboxRadix.Indicator>
              )}
            </CheckboxRadix.Root>
          </div>
          {label}
        </label>
      </div>
    )
  }
)

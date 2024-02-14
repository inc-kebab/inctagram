import React, { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef, useMemo } from 'react'

import { Check } from '@/shared/assets/icons/common'
import { Typography } from '@/shared/ui/Typography'
import * as CheckboxRadix from '@radix-ui/react-checkbox'
import clsx from 'clsx'

import s from './Checkbox.module.scss'

export type CheckboxProps = {
  checked?: boolean
  className?: string
  disabled?: boolean
  id?: string
  label?: ReactNode | string
  onValueChange?: (checked: boolean) => void
  required?: boolean
} & ComponentPropsWithoutRef<typeof CheckboxRadix.Root>

export type Ref = ElementRef<typeof CheckboxRadix.Indicator>

export const Checkbox = forwardRef<Ref, CheckboxProps>(
  ({ checked, disabled, id, label, onValueChange, required }) => {
    const cNames = useMemo(
      () => ({
        checkbox: clsx(s.checkbox, disabled && s.disabled, checked && s.checked),
        checkboxWrapper: clsx(s.checkboxWrapper, disabled && s.disabled),
        container: s.container,
        indicator: clsx(s.indicator, disabled && s.disabled),
        label: clsx(s.label, disabled && s.disabled),
      }),
      [checked, disabled]
    )

    return (
      <div className={cNames.container}>
        <Typography as="label" className={cNames.label} variant="regular14">
          <div className={cNames.checkboxWrapper}>
            <CheckboxRadix.Root
              checked={checked!}
              className={cNames.checkbox}
              disabled={disabled}
              id={id}
              onCheckedChange={onValueChange!}
              required={required}
            >
              {checked && (
                <CheckboxRadix.Indicator className={cNames.indicator}>
                  <Check className={disabled ? s.checkIconDisabled : s.checkIcon} />
                </CheckboxRadix.Indicator>
              )}
            </CheckboxRadix.Root>
          </div>
          {label}
        </Typography>
      </div>
    )
  }
)

Checkbox.defaultProps = {
  checked: false,
  disabled: false,
}

import { ComponentPropsWithoutRef, ReactNode, forwardRef } from 'react'

import { Calendar } from '@/shared/assets/icons/outline'
import clsx from 'clsx'

import s from './CustomInput.module.scss'

type Props = {
  error?: ReactNode
  label?: string
} & ComponentPropsWithoutRef<'input'>

export const CustomInput = forwardRef<HTMLInputElement, Props>(
  ({ className, disabled, error, id, label, ...props }, ref) => {
    const classes = {
      input: clsx(s.input, { [s.error]: error }),
      label: clsx(s.label, { [s.disabled]: disabled }),
      textField: clsx(s.textField, className),
    }

    return (
      <div className={classes.textField}>
        {label && (
          <label className={classes.label} htmlFor={id}>
            {label}
          </label>
        )}
        <div className={s.inputWrapper}>
          <input className={classes.input} disabled={disabled} id={id} ref={ref} {...props} />
          <Calendar className={s.calendar} />
        </div>
        {error && <span className={s.errorText}>{error}</span>}
      </div>
    )
  }
)

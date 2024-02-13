import { ChangeEvent, ComponentPropsWithoutRef, FC, useState } from 'react'

import { Close, Search } from '@/shared/assets/icons/common'
import Eye from '@/shared/assets/icons/outline/eye.svg'
import EyeOff from '@/shared/assets/icons/outline/eye-off.svg'
import clsx from 'clsx'

import s from './TextField.module.scss'

export type TextFieldProps = {
  className?: string
  disabled?: boolean
  error?: string
  id?: string
  label?: string
  onValueChange?: (value: string) => void
  type?: 'email' | 'password' | 'search'
  value: string
} & ComponentPropsWithoutRef<'input'>

export const TextField: FC<TextFieldProps> = ({
  className,
  disabled,
  error,
  id,
  label,
  onValueChange,
  type = 'text',
  value,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false)

  const classes = {
    closeBtn: clsx(s.closeBtn, { [s.active]: value }),
    input: clsx(s.input, error && s.error, s[type], { [s.active]: value }),
    searchSvg: clsx(s.searchSvg, { [s.active]: value }),
    textField: clsx(s.textField, className, { [s.disabled]: disabled }),
  }
  const onVisible = () => {
    setIsVisible(prevState => !prevState)
  }

  const onchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.onChange?.(e)
    onValueChange?.(e.target.value)
  }
  const clearFieldHandler = () => {
    onValueChange?.('')
  }

  return (
    <div className={classes.textField}>
      <label htmlFor={id}>{label}</label>
      <div className={s.inputWrapper}>
        {type === 'search' && <Search className={classes.searchSvg} />}
        <input
          className={classes.input}
          disabled={disabled}
          id={id}
          onChange={onchangeHandler}
          type={!isVisible ? type : 'text'}
          value={value}
          {...props}
        />
        {type === 'password' &&
          (isVisible ? (
            <button className={s.buttonPassword} disabled={disabled} onClick={onVisible}>
              <EyeOff />
            </button>
          ) : (
            <button className={s.buttonPassword} disabled={disabled} onClick={onVisible}>
              <Eye />
            </button>
          ))}
        {type === 'search' && value && (
          <button className={classes.closeBtn} onClick={clearFieldHandler}>
            <Close />
          </button>
        )}
      </div>
      {error && <span>{error}</span>}
    </div>
  )
}

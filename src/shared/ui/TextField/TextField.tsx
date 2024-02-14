import { ChangeEvent, ComponentPropsWithoutRef, FC, useState } from 'react'

import { Close, Search } from '@/shared/assets/icons/common'
import Eye from '@/shared/assets/icons/outline/eye.svg'
import EyeOff from '@/shared/assets/icons/outline/eye-off.svg'
import clsx from 'clsx'

import s from './TextField.module.scss'

export type TextFieldProps = {
  classNameInput?: string
  error?: string
  label?: string
  onValueChange?: (value: string) => void
  type?: 'email' | 'password' | 'search'
} & Omit<ComponentPropsWithoutRef<'input'>, 'type'>

export const TextField: FC<TextFieldProps> = ({
  className,
  classNameInput,
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
    input: clsx(s.input, s[type], { [s.error]: error }, classNameInput),
    label: clsx(s.label, { [s.disabled]: disabled }),
    textField: clsx(s.textField, className),
  }

  const onVisible = () => {
    setIsVisible(prevState => !prevState)
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.onChange?.(e)
    onValueChange?.(e.target.value)
  }
  const clearFieldHandler = () => {
    onValueChange?.('')
  }

  return (
    <div className={classes.textField}>
      <label className={classes.label} htmlFor={id}>
        {label}
      </label>
      <div className={s.inputWrapper}>
        <input
          className={classes.input}
          disabled={disabled}
          id={id}
          onChange={onChangeHandler}
          type={!isVisible ? type : 'text'}
          value={value}
          {...props}
        />
        {type === 'search' && <Search className={s.searchIcon} />}
        {type === 'password' &&
          (isVisible ? (
            <button className={s.rightBtn} disabled={disabled} onClick={onVisible}>
              <EyeOff />
            </button>
          ) : (
            <button className={s.rightBtn} disabled={disabled} onClick={onVisible}>
              <Eye />
            </button>
          ))}
        {type === 'search' && value && (
          <button className={s.rightBtn} disabled={disabled} onClick={clearFieldHandler}>
            <Close />
          </button>
        )}
      </div>
      {error && <span className={s.errorText}>{error}</span>}
    </div>
  )
}

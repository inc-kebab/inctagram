import { ChangeEvent, ComponentPropsWithoutRef, KeyboardEvent, forwardRef, useState } from 'react'

import { Close, Search } from '@/shared/assets/icons/common'
import { Eye, EyeOff } from '@/shared/assets/icons/outline'
import clsx from 'clsx'

import s from './TextField.module.scss'

export type TextFieldProps = {
  classNameInput?: string
  error?: string
  label?: string
  onValueChange?: (value: string) => void
  type?: 'email' | 'password' | 'search'
} & Omit<ComponentPropsWithoutRef<'input'>, 'type'>

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      className,
      classNameInput,
      disabled,
      error,
      id,
      label,
      onKeyDown,
      onValueChange,
      type = 'text',
      value,
      ...props
    },
    ref
  ) => {
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

    const onKeydownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        onKeyDown && onKeyDown(e)
      }
    }

    return (
      <div className={classes.textField}>
        <label className={classes.label} htmlFor={id}>
          {label}
        </label>
        <div className={s.inputWrapper}>
          <input
            autoComplete={type === 'email' ? 'email' : undefined}
            className={classes.input}
            disabled={disabled}
            id={id}
            onChange={onChangeHandler}
            onKeyDown={onKeydownHandler}
            ref={ref}
            type={!isVisible ? type : 'text'}
            value={value}
            {...props}
          />
          {type === 'search' && <Search className={s.searchIcon} />}
          {type === 'password' &&
            (isVisible ? (
              <button className={s.rightBtn} disabled={disabled} onClick={onVisible} type="button">
                <Eye />
              </button>
            ) : (
              <button className={s.rightBtn} disabled={disabled} onClick={onVisible} type="button">
                <EyeOff />
              </button>
            ))}
          {type === 'search' && value && (
            <button
              className={s.rightBtn}
              disabled={disabled}
              onClick={clearFieldHandler}
              type="button"
            >
              <Close />
            </button>
          )}
        </div>
        {error && <span className={s.errorText}>{error}</span>}
      </div>
    )
  }
)

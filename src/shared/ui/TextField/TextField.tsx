import { ChangeEvent, ComponentPropsWithoutRef, FC, useState } from 'react'

import Search from '@/shared/assets/icons/common/search.svg'
import Eye from '@/shared/assets/icons/outline/eye.svg'
import EyeOff from '@/shared/assets/icons/outline/eye-off.svg'
import clsx from 'clsx'

import s from './TextField.module.scss'

export type TextFieldProps = {
  error?: string
  id?: string
  label?: string
  onValueChange?: (value: string) => void
  type?: 'email' | 'password' | 'search'
  width?: string
} & ComponentPropsWithoutRef<'input'>

export const TextField: FC<TextFieldProps> = ({
  error,
  id,
  label,
  onValueChange,
  type = 'text',
  width,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false)

  const classes = {
    input: clsx(s.input, error && s.error, s[type]),
    textField: clsx(s.textField, props.className, props.disabled ? s.disabled : ''),
  }
  const onVisible = () => {
    setIsVisible(prevState => !prevState)
  }

  const onchangeHandler = function (e: ChangeEvent<HTMLInputElement>) {
    props.onChange?.(e)
    onValueChange?.(e.target.value)
  }

  return (
    <div className={classes.textField} style={{ width: `${width}` }}>
      <label htmlFor={id}>{label}</label>
      <div className={s.inputWrapper}>
        <input
          className={classes.input}
          disabled={props.disabled}
          id={id}
          onChange={onchangeHandler}
          placeholder={type === 'search' ? 'Input search' : props.placeholder}
          type={!isVisible ? type : 'text'}
          value={props.value}
        />
        {type === 'password' &&
          (isVisible ? (
            <button className={s.buttonPassword} disabled={props.disabled} onClick={onVisible}>
              <EyeOff />
            </button>
          ) : (
            <button className={s.buttonPassword} disabled={props.disabled} onClick={onVisible}>
              <Eye />
            </button>
          ))}
        {type === 'search' && <Search className={s.searchSvg} />}
      </div>
      {error && <span style={{ fontSize: '14px' }}>{error}</span>}
    </div>
  )
}

import { ComponentPropsWithoutRef, ElementType, ForwardedRef, forwardRef } from 'react'

import clsx from 'clsx'

import s from './Button.module.scss'

type ButtonProps<T extends ElementType = 'button'> = {
  as?: T
  className?: string
  fullWidth?: boolean
  variant?: 'outline' | 'primary' | 'secondary' | 'text'
} & ComponentPropsWithoutRef<T>

const ButtonPolymorph = <T extends ElementType = 'button'>(props: ButtonProps<T>, ref: any) => {
  const {
    as: Component = 'button',
    children,
    className,
    disabled,
    fullWidth,
    variant = 'primary',
    ...restProps
  } = props

  const classNames = {
    btn: clsx(className, s.button, s[variant], { [s.fullWidth]: fullWidth }),
  }

  return (
    <Component className={classNames.btn} {...restProps} disabled={disabled} ref={ref}>
      {children}
    </Component>
  )
}

export const Button = forwardRef(ButtonPolymorph) as <T extends ElementType>(
  props: ButtonProps<T> &
    Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>> & {
      ref?: ForwardedRef<ElementType<T>>
    }
) => ReturnType<typeof ButtonPolymorph>

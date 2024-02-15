import { ComponentPropsWithoutRef, ElementRef, ElementType, ReactNode, forwardRef } from 'react'

import { PolymorphRef } from '@/shared/types'
import clsx from 'clsx'

import s from './Button.module.scss'

type ButtonProps<T extends ElementType = 'button'> = {
  as?: T
  className?: string
  endIcon?: ReactNode
  fullWidth?: boolean
  startIcon?: ReactNode
  variant?: 'outline' | 'primary' | 'secondary' | 'text'
} & Omit<ComponentPropsWithoutRef<T>, 'className'>

type ButtonComponent = <T extends ElementType = 'button'>(
  props: ButtonProps<T> & PolymorphRef<T>
) => ReactNode

export const Button: ButtonComponent = forwardRef(
  <T extends ElementType = 'button'>(
    {
      as,
      children,
      className,
      disabled,
      endIcon,
      fullWidth,
      startIcon,
      variant = 'primary',
      ...restProps
    }: ButtonProps<T>,
    ref: ElementRef<T>
  ) => {
    const Component: ElementType = as || 'button'

    const classNames = {
      btn: clsx(s.button, s[variant], { [s.fullWidth]: fullWidth }, className),
    }

    return (
      <Component className={classNames.btn} {...restProps} disabled={disabled} ref={ref}>
        {startIcon}
        {children}
        {endIcon}
      </Component>
    )
  }
)

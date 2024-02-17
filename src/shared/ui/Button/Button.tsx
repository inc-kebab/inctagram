import { ElementRef, ElementType, ReactNode, forwardRef } from 'react'

import { PolymorphComponentPropsWithRef } from '@/shared/types'
import clsx from 'clsx'

import s from './Button.module.scss'

type CustomProps = {
  className?: string
  endIcon?: ReactNode
  fullWidth?: boolean
  startIcon?: ReactNode
  variant?: 'outline' | 'primary' | 'secondary' | 'text'
}

type Props<T extends ElementType> = PolymorphComponentPropsWithRef<T, CustomProps>

type ButtonComponent = <T extends ElementType = 'button'>(props: Props<T>) => ReactNode

export const Button: ButtonComponent = forwardRef(
  <T extends ElementType = 'button'>(
    {
      asComponent,
      children,
      className,
      endIcon,
      fullWidth,
      startIcon,
      variant = 'primary',
      ...restProps
    }: Props<T>,
    ref: ElementRef<T>
  ) => {
    const Component = asComponent || 'button'

    const classNames = {
      btn: clsx(s.button, s[variant], { [s.fullWidth]: fullWidth }, className),
    }

    return (
      <Component className={classNames.btn} {...restProps} ref={ref}>
        {startIcon}
        {children}
        {endIcon}
      </Component>
    )
  }
)

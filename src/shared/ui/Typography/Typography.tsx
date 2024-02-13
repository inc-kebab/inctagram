import { ComponentPropsWithoutRef, ElementRef, ElementType, ReactNode, forwardRef } from 'react'

import { PolymorphRef } from '@/shared/types'
import clsx from 'clsx'

import s from './Typography.module.scss'

type Props<T extends ElementType = 'p'> = {
  as?: T
  textAlign?: 'center' | 'end' | 'inherit' | 'start'
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'large'
    | 'regular14'
    | 'regular16'
    | 'regularBold14'
    | 'regularBold16'
    | 'regularLink'
    | 'regularMedium14'
    | 'small'
    | 'smallLink'
    | 'smallSemiBold'
} & ComponentPropsWithoutRef<T>

type TypographyComponent = <T extends ElementType = 'p'>(
  props: Props<T> & PolymorphRef<T>
) => ReactNode

export const Typography: TypographyComponent = forwardRef(
  <T extends ElementType = 'p'>(
    props: Props<T> & Omit<ComponentPropsWithoutRef<T>, keyof Props<T>>,
    ref: ElementRef<T>
  ) => {
    const { as, children, className, textAlign = 'start', variant = 'regular16', ...rest } = props
    const Component: ElementType = as || 'p'
    const finishClassName = clsx(s.typography, s[variant], className)

    return (
      <Component className={finishClassName} style={{ textAlign }} {...rest} ref={ref}>
        {children}
      </Component>
    )
  }
)

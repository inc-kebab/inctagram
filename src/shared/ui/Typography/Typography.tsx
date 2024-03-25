import { ElementRef, ElementType, ReactNode, forwardRef } from 'react'

import { PolymorphComponentPropsWithRef } from '@/shared/types/polymorph'
import clsx from 'clsx'

import s from './Typography.module.scss'

type CustomProps = {
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
}

type Props<T extends ElementType> = PolymorphComponentPropsWithRef<T, CustomProps>

type TypographyComponent = <T extends ElementType = 'p'>(props: Props<T>) => ReactNode

export const Typography: TypographyComponent = forwardRef(
  <T extends ElementType = 'p'>(
    {
      asComponent,
      children,
      className,
      textAlign = 'start',
      variant = 'regular16',
      ...rest
    }: Props<T>,
    ref: ElementRef<T>
  ) => {
    const Component = asComponent || 'p'
    const finishClassName = clsx(s.typography, s[variant], className)

    return (
      <Component className={finishClassName} style={{ textAlign }} {...rest} ref={ref}>
        {children}
      </Component>
    )
  }
)

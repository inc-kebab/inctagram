import { ComponentPropsWithoutRef, ElementRef, ElementType, ReactNode, forwardRef } from 'react'
import s from './Typography.module.scss'
import clsx from 'clsx'
import { PolymorphRef } from '@/shared/types'

type Props<T extends ElementType = 'p'> = {
  as?: T
  textAlign?: 'start' | 'center' | 'end' | 'inherit'
  children: string
  variant?:
    | 'large'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'regular16'
    | 'regularBold16'
    | 'regular14'
    | 'regularMedium14'
    | 'regularBold14'
    | 'small'
    | 'smallSemiBold'
    | 'regularLink'
    | 'smallLink'
} & ComponentPropsWithoutRef<T>

type TypographyComponent = <T extends ElementType = 'p'>(
  props: Props<T> & PolymorphRef<T>
) => ReactNode

export const Typography: TypographyComponent = forwardRef(
  <T extends ElementType = 'p'>(
    props: Props<T> & Omit<ComponentPropsWithoutRef<T>, keyof Props<T>>,
    ref: ElementRef<T>
  ) => {
    const { as, children, variant = 'large', textAlign = 'start', ...rest } = props
    const Component: ElementType = as || 'p'
    const finishClassName = clsx(`${s.typography} ${s[variant]}`)
    return (
      <Component className={finishClassName} style={{ textAlign }} {...rest} ref={ref}>
        {children}
      </Component>
    )
  }
)

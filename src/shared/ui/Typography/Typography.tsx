import React, { ComponentPropsWithoutRef, ElementType } from 'react'
import s from './Typography.module.scss'

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

const Typography = <T extends ElementType = 'p'>(
  props: Props<T> & Omit<ComponentPropsWithoutRef<T>, keyof Props<T>>
) => {
  const { as, children, variant = 'large', textAlign = 'start', ...rest } = props
  const Component = as || 'p'
  return (
    <Component className={`${s.typography} ${s[variant]}`} style={{ textAlign }} {...rest}>
      {children}
    </Component>
  )
}

export default Typography

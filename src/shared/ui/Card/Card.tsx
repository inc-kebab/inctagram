import { ComponentPropsWithoutRef, ElementRef, ElementType, ReactNode, forwardRef } from 'react'

import { PolymorphComponentPropsWithRef } from '@/shared/types/polymorph'
import clsx from 'clsx'

import s from './Card.module.scss'

type Props<T extends ElementType> = PolymorphComponentPropsWithRef<T, ComponentPropsWithoutRef<T>>

type CardComponent = <T extends ElementType = 'div'>(props: Props<T>) => ReactNode

export const Card: CardComponent = forwardRef(
  <T extends ElementType = 'div'>(
    { asComponent, className, ...rest }: Props<T>,
    ref: ElementRef<T>
  ) => {
    const Component = asComponent || 'div'

    return <Component className={clsx(s.card, className)} ref={ref} {...rest} />
  }
)

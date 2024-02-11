import { ComponentPropsWithoutRef } from 'react'

import clsx from 'clsx'

import s from './card.module.scss'

type CardProps = ComponentPropsWithoutRef<'div'>
export const Card = ({ children, className, ...rest }: CardProps) => {
  const cardCN = clsx(s.card, className)

  return (
    <div className={cardCN} {...rest}>
      {children}
    </div>
  )
}

import { ComponentPropsWithoutRef } from 'react'

import clsx from 'clsx'

import s from './card.module.scss'

type CardProps = ComponentPropsWithoutRef<'div'>
export const Card = ({ className, ...rest }: CardProps) => (
  <div className={clsx(s.card, className)} {...rest} />
)

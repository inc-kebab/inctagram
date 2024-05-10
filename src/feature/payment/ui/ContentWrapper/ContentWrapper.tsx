import { PropsWithChildren } from 'react'

import { Card } from '@/shared/ui/Card'
import { Typography } from '@/shared/ui/Typography'
import clsx from 'clsx'

import s from './ContentWrapper.module.scss'

type Props = {
  className?: { card?: string; container?: string }
  title?: string
} & PropsWithChildren

export const ContentWrapper = ({ children, className, title }: Props) => {
  return (
    <div className={className?.container}>
      {title && (
        <Typography asComponent="h3" className={s.title} variant="h3">
          {title}
        </Typography>
      )}
      <Card className={clsx(s.content, className?.card)}>{children}</Card>
    </div>
  )
}

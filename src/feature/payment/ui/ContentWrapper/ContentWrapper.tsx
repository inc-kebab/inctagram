import { PropsWithChildren } from 'react'

import { Card } from '@/shared/ui/Card'
import { Typography } from '@/shared/ui/Typography'

import s from './ContentWrapper.module.scss'

type Props = {
  className?: string
  title: string
} & PropsWithChildren

export const ContentWrapper = ({ children, className, title }: Props) => {
  return (
    <div className={className}>
      <Typography asComponent="h3" className={s.title} variant="h3">
        {title}
      </Typography>
      <Card className={s.content}>{children}</Card>
    </div>
  )
}

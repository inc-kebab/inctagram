import { PropsWithChildren } from 'react'

import { Card } from '@/shared/ui/Card'
import { Typography } from '@/shared/ui/Typography'
import clsx from 'clsx'

import s from './ContentWrapper.module.scss'

type Props = {
  className?: string
  classNameCard?: string
  title?: string
} & PropsWithChildren

export const ContentWrapper = ({ children, className, classNameCard, title }: Props) => {
  return (
    <div className={clsx(s.root, className)}>
      {title && (
        <Typography asComponent="h3" variant="h3">
          {title}
        </Typography>
      )}
      <Card className={clsx(s.content, classNameCard)}>{children}</Card>
    </div>
  )
}

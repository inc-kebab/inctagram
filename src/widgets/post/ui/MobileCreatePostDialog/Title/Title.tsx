import { ReactNode } from 'react'

import { ArrowIos } from '@/shared/assets/icons/common'
import { Button } from '@/shared/ui/Button'
import { Typography } from '@/shared/ui/Typography'
import clsx from 'clsx'

import s from './Title.module.scss'

interface Props {
  buttonTextRight?: ReactNode
  className?: string
  onBackClick: () => void
  onNextClick: () => void
  showLeftButton?: boolean
  showRightButton?: boolean
  title: string
}

export const Title = ({
  buttonTextRight,
  className,
  onBackClick,
  onNextClick,
  showLeftButton,
  showRightButton,
  title,
}: Props) => {
  return (
    <div className={clsx(s.title, className)}>
      {showLeftButton && (
        <Button
          className={s.left}
          onClick={onBackClick}
          startIcon={<ArrowIos height={24} width={24} />}
          variant="text"
        />
      )}
      <Typography asComponent="h2" textAlign="center" variant="h1">
        {title}
      </Typography>
      {showRightButton && (
        <Button className={s.right} onClick={onNextClick} variant="text">
          {buttonTextRight}
        </Button>
      )}
    </div>
  )
}

import { ArrowIos } from '@/shared/assets/icons/common'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Button } from '@/shared/ui/Button'
import { Typography } from '@/shared/ui/Typography'

import s from './Title.module.scss'

interface Props {
  onBackClick: () => void
  onNextClick: () => void
  showLeftButton?: boolean
  showRightButton?: boolean
  title: string
}

export const Title = ({
  onBackClick,
  onNextClick,
  showLeftButton,
  showRightButton,
  title,
}: Props) => {
  const { t } = useTranslation()

  return (
    <div className={s.title}>
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
          {t.pages.post.next}
        </Button>
      )}
    </div>
  )
}

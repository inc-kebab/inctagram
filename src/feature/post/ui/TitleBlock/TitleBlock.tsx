import { ArrowIos } from '@/shared/assets/icons/common'
import { useTranslation } from '@/shared/hooks'
import { Button } from '@/shared/ui/Button'
import { Typography } from '@/shared/ui/Typography'

import s from './TitleBlock.module.scss'

interface Props {
  onBackClick?: () => void
  onNextClick?: () => void
  showLeftButton?: boolean
  showRightButton?: boolean
  title: string
}

export const TitleBlock = ({
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
          {t.button.next}
        </Button>
      )}
    </div>
  )
}

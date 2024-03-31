import { ArrowIos } from '@/shared/assets/icons/common'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Button } from '@/shared/ui/Button'
import { Typography } from '@/shared/ui/Typography'

import s from './CreatePostDialogTitle.module.scss'

import { CurrentWindow } from '../../model/types/post.types'

interface Props {
  currentWindow: CurrentWindow
  onBackClick: () => void
  onNextClick: () => void
  title: string
}

export const CreatePostDialogTitle = ({
  currentWindow,
  onBackClick,
  onNextClick,
  title,
}: Props) => {
  const { t } = useTranslation()

  return (
    <div className={s.title}>
      <Button
        className={s.left}
        onClick={onBackClick}
        startIcon={<ArrowIos height={24} width={24} />}
        variant="text"
      />
      <Typography asComponent="h2" textAlign="center" variant="h1">
        {title}
      </Typography>
      {currentWindow !== 'description' && (
        <Button className={s.right} onClick={onNextClick} variant="text">
          {t.pages.post.next}
        </Button>
      )}
    </div>
  )
}

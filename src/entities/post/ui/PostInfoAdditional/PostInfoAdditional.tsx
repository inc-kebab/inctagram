import { Bookmark, Heart, MessageCircle, PaperPlane } from '@/shared/assets/icons/outline'
import { useTranslation } from '@/shared/hooks'
import { Avatar } from '@/shared/ui/Avatar'
import { Button } from '@/shared/ui/Button'
import { Typography } from '@/shared/ui/Typography'
import clsx from 'clsx'
import { formatWithOptions } from 'date-fns/fp/formatWithOptions'
import { enUS, ru } from 'date-fns/locale'
import { useRouter } from 'next/router'

import s from './PostInfoAdditional.module.scss'

type Props = {
  avatars: string[]
  className?: string
  datePost: string
  isActiveCommentForm?: boolean
  likesCount: number
  toggleShowCommentForm?: () => void
}

export const PostInfoAdditional = ({
  avatars,
  className,
  datePost,
  isActiveCommentForm,
  likesCount,
  toggleShowCommentForm,
}: Props) => {
  const { t } = useTranslation()
  const { locale } = useRouter()

  const formatDate = formatWithOptions(
    { locale: locale === 'ru' ? ru : enUS },
    locale === 'ru' ? 'd MMMM yyyy' : 'MMMM d yyyy'
  )

  const date = formatDate(datePost)

  return (
    <div className={clsx(s.postInfo, className)}>
      <div className={s.actions}>
        <div className={s.wrapper}>
          <Button className={s.iconBtn} variant="text">
            <Heart className={s.icon} />
          </Button>
          <Button
            className={clsx(s.iconBtn, s.messageBtn)}
            onClick={toggleShowCommentForm}
            variant="text"
          >
            <MessageCircle className={clsx(s.icon, isActiveCommentForm && s.active)} />
          </Button>
          <Button className={s.iconBtn} variant="text">
            <PaperPlane className={s.icon} />
          </Button>
        </div>
        <Button className={s.iconBtn} variant="text">
          <Bookmark className={s.icon} />
        </Button>
      </div>
      <div className={s.avatars}>
        {avatars.map((a, i) => (
          <Avatar
            avatarUrl={a}
            circle
            className={s.avatar}
            iconSize={18}
            key={i + new Date().toString()}
            style={{ left: `${-(i * 15)}px` }}
            wrapperSize={24}
          />
        ))}
      </div>
      <Typography className={s.likesCount}>
        {likesCount} {t.pages.post.likes}
      </Typography>
      <Typography asComponent="span" className={s.date} variant="small">
        {date}
      </Typography>
    </div>
  )
}

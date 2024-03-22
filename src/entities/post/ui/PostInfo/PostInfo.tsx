import { Bookmark, Heart, MessageCircle, PaperPlane } from '@/shared/assets/icons/outline'
import { Avatar } from '@/shared/ui/Avatar'
import { Button } from '@/shared/ui/Button'
import { Typography } from '@/shared/ui/Typography'
import clsx from 'clsx'
import { formatWithOptions } from 'date-fns/fp/formatWithOptions'
import { enUS, ru } from 'date-fns/locale'
import { useRouter } from 'next/router'

import s from './PostInfo.module.scss'

type Props = {
  avatars: string[]
  className?: string
  datePost: string
  likesCount: number
}

export const PostInfo = ({ avatars, className, datePost, likesCount }: Props) => {
  const { locale } = useRouter()
  const formatDate = formatWithOptions(
    { locale: locale === 'ru' ? ru : enUS },
    locale === 'ru' ? 'd MMMM yyyy' : 'MMMM d yyyy'
  )
  const date = formatDate(datePost)

  return (
    <div className={clsx(s.postInfo, className)}>
      <div className={s.icons}>
        <div className={s.firstIcons}>
          <Button className={s.iconBtn} variant="text">
            <Heart className={s.icon} />
          </Button>
          <Button className={clsx(s.iconBtn, s.messageBtn)} variant="text">
            <MessageCircle className={s.icon} />
          </Button>
          <Button className={s.iconBtn} variant="text">
            <PaperPlane className={s.icon} />
          </Button>
        </div>
        <Button className={s.iconBtn} variant="text">
          <Bookmark className={s.icon} />
        </Button>
      </div>
      <div className={s.iconsList}>
        {avatars.map((a, i) => (
          <Avatar
            avatarUrl={a}
            circle
            className={s.iconInList}
            iconSize={18}
            key={a}
            style={{ left: `${-(i * 15)}px` }}
            wrapperSize={24}
          />
        ))}
      </div>
      <Typography className={s.likesCount}>{likesCount} Like</Typography>
      <Typography asComponent="span" className={s.date} variant="small">
        {date}
      </Typography>
    </div>
  )
}

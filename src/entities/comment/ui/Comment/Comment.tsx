import { Heart } from '@/shared/assets/icons/fill'
import { Heart as HeartOutline } from '@/shared/assets/icons/outline'
import { useTranslation } from '@/shared/hooks'
import { Avatar } from '@/shared/ui/Avatar'
import { Button } from '@/shared/ui/Button'
import { Typography } from '@/shared/ui/Typography'
import clsx from 'clsx'
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow'
import { enUS, ru } from 'date-fns/locale'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './Comment.module.scss'

type Props = {
  avatarUrl: Nullable<string>
  className?: string
  classNameAvatar?: string
  commentText: Nullable<string>
  isOwner: boolean
  isShortenComment?: boolean
  like?: boolean
  likesCount?: number
  name: string
  time: string
}

export const Comment = ({
  avatarUrl,
  className,
  classNameAvatar,
  commentText,
  isOwner,
  isShortenComment,
  like,
  likesCount,
  name,
  time,
}: Props) => {
  const { t } = useTranslation()
  const { locale } = useRouter()

  const dateAgo = formatDistanceToNow(new Date(time), {
    addSuffix: true,
    locale: locale === 'ru' ? ru : enUS,
  })

  return (
    <div className={clsx(s.comment, className)}>
      <Avatar
        avatarUrl={avatarUrl}
        circle
        className={clsx(s.avatar, classNameAvatar)}
        iconSize={21}
        wrapperSize={36}
      />
      <div className={s.content}>
        <Typography asComponent={Link} href="#" variant="regularBold14">
          {name + ' '}
        </Typography>
        {commentText && (
          <div className={s.textWrapper}>
            <Typography
              asComponent="span"
              className={clsx(s.text, isShortenComment && s.shortText)}
              variant="regular14"
            >
              {commentText}
            </Typography>
            {!isOwner && (
              <Button asComponent="span" className={s.buttonHeart} variant="text">
                {like ? <Heart className={s.heart} /> : <HeartOutline className={s.heartOutline} />}
              </Button>
            )}
          </div>
        )}
        <div className={s.footer}>
          <Typography asComponent="span" variant="small">
            {dateAgo}
          </Typography>
          <Typography asComponent="span" variant="small">
            {`${t.pages.post.likes}: ${likesCount || 0}`}
          </Typography>
          {!isOwner && (
            <Button asComponent="span" className={s.answerBtn} variant="text">
              <Typography variant="smallSemiBold">{t.button.answer}</Typography>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

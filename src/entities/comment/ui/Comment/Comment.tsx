import { Heart } from '@/shared/assets/icons/fill'
import { Heart as HeartOutline } from '@/shared/assets/icons/outline'
import { Avatar } from '@/shared/ui/Avatar'
import { Button } from '@/shared/ui/Button'
import { Typography } from '@/shared/ui/Typography'
import clsx from 'clsx'
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow'
import Link from 'next/link'

import s from './Comment.module.scss'

type Props = {
  avatarUrl?: string
  className?: string
  commentText: Nullable<string>
  isOwner: boolean
  like?: boolean
  likesCount?: number
  name: string
  time: string
}

export const Comment = ({
  avatarUrl,
  className,
  commentText,
  isOwner,
  like,
  likesCount,
  name,
  time,
}: Props) => {
  const dateAgo = formatDistanceToNow(new Date(time))

  return (
    <div className={clsx(s.comment, className)}>
      <Link className={s.link} href="#">
        <Avatar avatarUrl={avatarUrl} circle className={s.avatar} iconSize={21} wrapperSize={36} />
      </Link>
      <div className={s.commentContent}>
        <div className={s.textContent}>
          <div className={s.message}>
            <Link href="#">
              <Typography asComponent="span" variant="regularBold14">
                {name + ' '}
              </Typography>
            </Link>
            {commentText && (
              <Typography asComponent="span" variant="regular14">
                {commentText}
              </Typography>
            )}
          </div>
          {!isOwner && (
            <Button asComponent="span" className={s.buttonHeart} variant="text">
              {like ? <Heart className={s.heart} /> : <HeartOutline className={s.heartOutline} />}
            </Button>
          )}
        </div>
        <div className={s.commentFooter}>
          <Typography asComponent="span" variant="small">
            {dateAgo} ago
          </Typography>
          {!!likesCount && (
            <Typography asComponent="span" variant="small">
              {`Likes: ${likesCount}`}
            </Typography>
          )}
          {!isOwner && (
            <Button asComponent="span" className={s.answerBtn} variant="text">
              <Typography variant="smallSemiBold">Answer</Typography>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

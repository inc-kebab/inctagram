import { CommentsList } from '@/entities/comment'
import { PostItem } from '@/entities/post'
import { mockComments } from '@/feature/comment'
import { Arrow } from '@/shared/assets/icons/common'
import { Button } from '@/shared/ui/Button'
import { Typography } from '@/shared/ui/Typography'
import clsx from 'clsx'

import s from './CommentsDetails.module.scss'

interface Props {
  className?: string
  item: Nullable<PostItem>
  onHide: () => void
  userId?: number
}

export const CommentsDetails = ({ className, item, onHide, userId }: Props) => {
  if (!item) {
    return null
  }

  return (
    <div className={clsx(s.root, className)}>
      <div className={s.title}>
        <Button className={s.button} onClick={onHide} startIcon={<Arrow />} variant="text" />
        <Typography asComponent="h2" variant="h2">
          Comments
        </Typography>
      </div>
      <CommentsList
        className={s.content}
        classNameDescription={s.description}
        comments={mockComments.items}
        postItem={item}
        userId={userId}
      />
    </div>
  )
}

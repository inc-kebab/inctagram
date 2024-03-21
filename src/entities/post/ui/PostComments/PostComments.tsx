import { Comment, CommentData } from '@/entities/post'
import { PostItem } from '@/feature/post/model/types/api.types'
import { useTranslation } from '@/shared/hooks/useTranslation'
import clsx from 'clsx'

import s from './PostComments.module.scss'

type Props = {
  className?: string
  comments: CommentData[]
  postItem: PostItem
}

export const PostComments = ({ className, comments, postItem }: Props) => {
  const { t } = useTranslation()
  const myId = 1

  return (
    <div className={clsx(s.comments, className)}>
      <Comment
        avatarUrl={postItem.avatarOwner}
        commentText={postItem.description}
        isOwner={myId === postItem.ownerId}
        name={postItem.username}
        time={postItem.createdAt}
      />
      {comments.map(comment => (
        <Comment
          avatarUrl={comment.avatarUrl}
          commentText={comment.commentText}
          isOwner={myId === postItem.ownerId}
          key={comment.idUser}
          like={comment.like}
          likesCount={comment.likesCount}
          name={comment.name}
          time={comment.time}
        />
      ))}
    </div>
  )
}

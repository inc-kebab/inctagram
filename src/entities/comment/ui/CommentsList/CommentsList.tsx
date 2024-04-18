import { PostItem } from '@/entities/post'
import clsx from 'clsx'

import s from './CommentsList.module.scss'

import { CommentData } from '../../model/types/comment.types'
import { Comment } from '../../ui/Comment/Comment'

type Props = {
  className?: string
  comments: CommentData[]
  maxMobileComments?: number
  postItem: PostItem
  shortenedComments?: boolean
  userId?: number
}

export const CommentsList = ({
  className,
  comments,
  maxMobileComments,
  postItem,
  shortenedComments,
  userId,
}: Props) => {
  return (
    <div className={clsx(s.comments, className)}>
      <Comment
        avatarUrl={postItem.avatarOwner}
        commentText={postItem.description}
        isOwner={userId === postItem.ownerId}
        name={postItem.username}
        time={postItem.createdAt}
      />
      {comments.map((comment, i) => {
        return (
          <Comment
            avatarUrl={comment.avatarUrl}
            className={clsx(maxMobileComments && i > maxMobileComments - 1 && s.hidden)}
            commentText={comment.commentText}
            isOwner={userId === comment.idUser}
            key={comment.idUser + comment.time}
            like={comment.like}
            likesCount={comment.likesCount}
            name={comment.name}
            shortenedComments={shortenedComments}
            time={comment.time}
          />
        )
      })}
    </div>
  )
}

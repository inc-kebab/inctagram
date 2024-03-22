import { Comment, CommentData } from '@/entities/comment'
import { PostItem } from '@/entities/post'
import clsx from 'clsx'

import s from './CommentsList.module.scss'

type Props = {
  className?: string
  comments: CommentData[]
  postItem: PostItem
}

export const CommentsList = ({ className, comments, postItem }: Props) => {
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

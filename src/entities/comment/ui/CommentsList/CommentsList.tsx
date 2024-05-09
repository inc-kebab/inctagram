import { PostItem } from '@/entities/post'
import clsx from 'clsx'

import s from './CommentsList.module.scss'

import { CommentData } from '../../model/types/comment.types'
import { Comment } from '../../ui/Comment/Comment'

type Props = {
  className?: string
  classNameAvatar?: string
  classNameDescription?: string
  comments: CommentData[]
  isShortenComments?: boolean
  maxMobileComments?: number
  postItem: PostItem
  userId?: number
}

export const CommentsList = ({
  className,
  classNameAvatar,
  classNameDescription,
  comments,
  isShortenComments,
  maxMobileComments,
  postItem,
  userId,
}: Props) => {
  return (
    <div className={clsx(s.comments, className)}>
      <Comment
        avatarUrl={postItem.avatarOwner}
        className={clsx(s.first, classNameDescription)}
        classNameAvatar={classNameAvatar}
        commentText={postItem.description}
        isComment={false}
        isOwner={userId === postItem.ownerId}
        isShortenComment={isShortenComments}
        name={postItem.username}
        time={postItem.createdAt}
      />
      {comments.map((comment, i) => {
        const isHiddenComment = maxMobileComments && i > maxMobileComments - 1

        return (
          <Comment
            avatarUrl={comment.avatarUrl}
            className={clsx(isHiddenComment && s.hidden)}
            classNameAvatar={classNameAvatar}
            commentText={comment.commentText}
            isOwner={userId === comment.idUser}
            isShortenComment={isShortenComments}
            key={comment.idUser + comment.time}
            like={comment.like}
            likesCount={comment.likesCount}
            name={comment.name}
            time={comment.time}
          />
        )
      })}
    </div>
  )
}

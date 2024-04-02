import { forwardRef } from 'react'

import clsx from 'clsx'

import s from './PostsList.module.scss'

import { PostItem } from '../../model/types/post.types'
import { PostPreviewCard } from '../PostPreviewCard/PostPreviewCard'

interface Props {
  className?: string
  cursor?: number
  list?: PostItem[]
  onSetCurrentPost?: (post: PostItem) => void
}

export const PostsList = forwardRef<HTMLDivElement, Props>(
  ({ className, cursor, list, onSetCurrentPost }, ref) => {
    if (!list || !list.length) {
      return null
    }

    return (
      <div className={clsx(s.PostsList, className)}>
        {list.map(el => (
          <PostPreviewCard
            className={s.size}
            description={el.description}
            imageSrc={el.images[0].url}
            key={el.id}
            onClick={() => onSetCurrentPost?.(el)}
            ref={el.id === cursor ? ref : undefined}
          />
        ))}
      </div>
    )
  }
)

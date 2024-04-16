import { forwardRef } from 'react'

import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'
import clsx from 'clsx'

import s from './PostsList.module.scss'

import { PostItem } from '../../model/types/post.types'
import { PostPreviewCard } from '../PostPreviewCard/PostPreviewCard'

interface Props {
  className?: string
  cursor?: number
  isFetching?: boolean
  list?: PostItem[]
  onSetCurrentPost?: (post: PostItem) => void
}

export const PostsList = forwardRef<HTMLDivElement, Props>(
  ({ className, cursor, isFetching, list, onSetCurrentPost }, ref) => {
    if (!list || !list.length) {
      return null
    }

    const missingSkeletons = 3 - (list.length % 3)

    const skeletonMobileCount = missingSkeletons < 3 && missingSkeletons

    return (
      <div className={clsx(s.list, className)}>
        {list.map(el => (
          <PostPreviewCard
            description={el.description}
            imageSrc={el.images[0].url}
            key={el.id}
            onClick={() => onSetCurrentPost?.(el)}
            ref={el.id === cursor ? ref : undefined}
          />
        ))}
        {skeletonMobileCount &&
          isFetching &&
          new Array(skeletonMobileCount)
            .fill(null)
            .map((_, i) => <Skeleton className={s.hidden} key={i} />)}
      </div>
    )
  }
)

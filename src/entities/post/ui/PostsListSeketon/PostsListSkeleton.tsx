import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'
import clsx from 'clsx'

import s from './PostsListSkeleton.module.scss'

type PostsListSkeletonProps = {
  count?: number
}
export const PostsListSkeleton = ({ count = 4 }: PostsListSkeletonProps) => {
  return (
    <div className={s.postsListSkeleton}>
      {new Array(count).fill(0).map((_, i) => {
        const hiddenCls = clsx(i === 3 && s.hidden)

        return <Skeleton className={hiddenCls} key={i} />
      })}
    </div>
  )
}

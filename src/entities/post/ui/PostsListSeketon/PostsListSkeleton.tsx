import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'
import clsx from 'clsx'

import s from './PostsListSkeleton.module.scss'

type Props = {
  className?: string
  count?: number
}

export const PostsListSkeleton = ({ className, count = 4 }: Props) => {
  return (
    <div className={clsx(s.list, className)}>
      {new Array(count).fill(0).map((_, i) => {
        const isFourthEl = i > 0 && i % 3 === 0

        return (
          <Skeleton
            className={clsx(s.skeleton, isFourthEl && s.hidden)}
            height="100%"
            key={i}
            width="100%"
          />
        )
      })}
    </div>
  )
}

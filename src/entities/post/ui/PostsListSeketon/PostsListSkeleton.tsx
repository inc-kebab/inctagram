import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'
import clsx from 'clsx'

import s from './PostsListSkeleton.module.scss'

interface Props {
  className?: string
  count?: number
}

export const PostsListSkeleton = ({ className, count = 4 }: Props) => {
  return (
    <div className={clsx(s.list, className)}>
      {new Array(count).fill(0).map((_, i) => (
        <Skeleton border="3px" height={238} key={i} width={238} />
      ))}
    </div>
  )
}

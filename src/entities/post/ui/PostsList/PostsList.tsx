import { PostItem } from '@/entities/post'
import clsx from 'clsx'

import s from './PostsList.module.scss'

import { PostPreviewCard } from '../PostPreviewCard/PostPreviewCard'

interface Props {
  className?: string
  list?: PostItem[]
  onSetCurrentPost?: (post: PostItem) => void
}

export const PostsList = ({ className, list, onSetCurrentPost }: Props) => {
  if (!list || !list.length) {
    return null
  }

  return (
    <div className={clsx(s.PostsList, className)}>
      {list.map(el => (
        <PostPreviewCard
          description={el.description}
          imageSrc={el.images[0].url}
          key={el.id}
          onClick={() => onSetCurrentPost?.(el)}
        />
      ))}
    </div>
  )
}

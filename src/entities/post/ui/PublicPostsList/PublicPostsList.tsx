import { AppRoutes } from '@/shared/const/routes'
import { useRouter } from 'next/router'

import s from './PublicPostsList.module.scss'

import { PostItem } from '../../model/types/post.types'
import { PublicPost } from '../PublicPost/PublicPost'

type Props = { posts: PostItem[] | undefined }

export const PublicPostsList = ({ posts }: Props) => {
  const { push } = useRouter()

  if (!posts || !posts.length) {
    return null
  }

  return (
    <div className={s.posts}>
      {posts &&
        posts.map((post, i) => (
          <div key={`${post.id}-${i}`}>
            <PublicPost
              handleClick={() => push(`${AppRoutes.PUBLIC_PROFILE}/${post.ownerId}`)}
              post={post}
            />
          </div>
        ))}
    </div>
  )
}

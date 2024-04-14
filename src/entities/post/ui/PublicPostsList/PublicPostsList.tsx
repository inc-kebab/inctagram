import { AppRoutes } from '@/shared/const/routes'
import { useRouter } from 'next/router'

import s from './PublicPostsList.module.scss'

import { PostItem } from '../../model/types/post.types'
import { PublicPost } from '../PublicPost/PublicPost'

type Props = {
  isAuth: boolean
  posts?: PostItem[]
}

export const PublicPostsList = ({ isAuth, posts }: Props) => {
  const { push } = useRouter()

  if (!posts || !posts.length) {
    return null
  }

  return (
    <div className={s.posts}>
      {posts.map((post, i) => {
        const route = isAuth ? AppRoutes.PROFILE : AppRoutes.PUBLIC_PROFILE

        return (
          <div key={`${post.id}-${i}`}>
            <PublicPost
              onNavigateToPost={() => push(`${route}/${post.ownerId}?post=${post.id}`)}
              post={post}
            />
          </div>
        )
      })}
    </div>
  )
}

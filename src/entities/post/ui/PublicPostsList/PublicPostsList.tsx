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
        const route = isAuth ? AppRoutes.PUBLIC_PROFILE : AppRoutes.PROFILE

        return (
          <div key={`${post.id}-${i}`}>
            <PublicPost handleClick={() => push(`${route}/${post.ownerId}`)} post={post} />
          </div>
        )
      })}
    </div>
  )
}

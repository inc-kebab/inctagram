import s from './PublicPostsList.module.scss'

import { PostItem } from '../../model/types/post.types'
import { PublicPost } from '../PublicPost/PublicPost'

type Props = { posts: PostItem[] | undefined }

export const PublicPostsList = ({ posts }: Props) => {
  if (!posts || !posts.length) {
    return null
  }

  return (
    <div className={s.posts}>
      {posts && posts.map(post => <PublicPost key={post.id} post={post} />)}
    </div>
  )
}

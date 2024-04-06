import { PostItem } from '@/feature/public-posts/model/types/public-posts.types'
import Image from 'next/image'

import s from './PublicPostsList.module.scss'

type Props = {
  posts: PostItem[]
}

export const PublicPostsList = ({ posts }: Props) => {
  return (
    <div className={s.posts}>
      {posts.map(el => (
        <Image alt="awd" height={300} key={el.id} src={el.images[0].url} width={200} />
      ))}
    </div>
  )
}

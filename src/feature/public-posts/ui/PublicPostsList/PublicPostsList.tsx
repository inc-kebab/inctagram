import { PostItem } from '@/feature/public-posts/model/types/public-posts.types'
import Image from 'next/image'
import Link from 'next/link'

import s from './PublicPostsList.module.scss'

type Props = {
  posts: PostItem[]
}

export const PublicPostsList = ({ posts }: Props) => {
  return (
    <div className={s.posts}>
      {posts.map(el => (
        <div className={s.wrapper} key={el.id}>
          <Image alt="awd" height={300} src={el.images[0].url} width={200} />
          <Link href={`public/${el.ownerId}`}>
            <h2>{el.username}</h2>
          </Link>
          <p>{el.description}</p>
        </div>
      ))}
    </div>
  )
}

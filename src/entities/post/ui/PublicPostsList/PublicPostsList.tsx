import Image from 'next/image'

import s from './PublicPostsList.module.scss'

import { PostItem } from '../../model/types/post.types'

type Props = { posts: PostItem[] | undefined }

export const PublicPostsList = ({ posts }: Props) => {
  if (!posts || !posts.length) {
    return null
  }

  return (
    <div className={s.posts}>
      {posts &&
        posts.map(el => (
          <Image alt="awd" height={300} key={el.id} src={el.images[0].url} width={200} />
        ))}
    </div>
  )
}

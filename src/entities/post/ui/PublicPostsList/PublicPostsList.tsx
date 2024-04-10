import { AppRoutes } from '@/shared/const/routes'
import Image from 'next/image'
import { useRouter } from 'next/router'

import s from './PublicPostsList.module.scss'

import { PostItem } from '../../model/types/post.types'

type Props = { posts: PostItem[] | undefined }

export const PublicPostsList = ({ posts }: Props) => {
  const { push } = useRouter()

  if (!posts || !posts.length) {
    return null
  }

  return (
    <div className={s.posts}>
      {posts &&
        posts.map(el => (
          <div
            key={el.id}
            onClick={() => {
              push(`${AppRoutes.PUBLIC_PROFILE}/${el.ownerId}?post=${el.id}`)
            }}
          >
            <Image alt="awd" height={300} src={el.images[0].url} width={200} />
          </div>
        ))}
    </div>
  )
}

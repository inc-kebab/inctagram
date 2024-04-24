import { ImageURL } from '@/entities/post'
import { UserBanner } from '@/entities/user'
import { EditPostForm } from '@/feature/post'
import { useCreatePost } from '@/feature/post/model/hooks/useCreatePost'
import { useGetMyProfileQuery } from '@/feature/profile'
import { useTranslation } from '@/shared/hooks'
import { Loader } from '@/shared/ui/Loader'
import Image from 'next/image'

import s from './MobileDescriptionScreen.module.scss'

interface Props {
  images: ImageURL[]
  onChangeStatus?: (status: boolean) => void
  onCloseModal: () => void
}

export const MobileDescriptionScreen = ({ images, onChangeStatus, onCloseModal }: Props) => {
  const { t } = useTranslation()

  const { data, isLoading } = useGetMyProfileQuery(undefined)

  const { createPostRef, handleSubmitCreatePost, isCreatePostLoad } = useCreatePost({
    callback: onCloseModal,
    changeStatus: onChangeStatus,
    imagesWithFilters: images,
    t,
  })

  return (
    <div className={s.container}>
      <div className={s.slider}>
        {images.map((image, i) => {
          const { imageURL } = image

          return (
            <div className={s.slide} key={imageURL + i}>
              <Image
                alt={imageURL + i}
                className={s.image}
                fill
                objectFit="contain"
                src={imageURL}
              />
            </div>
          )
        })}
      </div>
      <div className={s.description}>
        {isLoading ? (
          <Loader containerHeight isWhite />
        ) : (
          <>
            <UserBanner
              avatar={data?.avatars?.['avatar-medium']?.url}
              name={data?.username || ''}
            />
            <EditPostForm
              className={s.textarea}
              classNameSubmit={s.submitBtn}
              disabled={isCreatePostLoad}
              onSubmit={handleSubmitCreatePost}
              ref={createPostRef}
              style={{ height: '100%' }}
              titleSubmit={t.pages.post.publish}
            />
          </>
        )}
      </div>
    </div>
  )
}

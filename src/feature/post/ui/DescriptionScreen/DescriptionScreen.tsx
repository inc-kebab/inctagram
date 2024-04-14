import { ImageURL } from '@/entities/post'
import { UserBanner } from '@/entities/user'
import { useGetMyProfileQuery } from '@/feature/profile'
import { getDefaultSwiperConfig } from '@/shared/helpers'
import { useTranslation } from '@/shared/hooks'
import { Loader } from '@/shared/ui/Loader'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'

import s from './DescriptionScreen.module.scss'

import { useCreatePost } from '../../model/hooks/useCreatePost'
import { EditPostForm } from '../EditPostForm/EditPostForm'

interface Props {
  images: ImageURL[]
  onChangeStatus?: (status: boolean) => void
  onCloseModal: () => void
}

export const DescriptionScreen = ({ images, onChangeStatus, onCloseModal }: Props) => {
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
      <Swiper {...getDefaultSwiperConfig({ classes: [s.slider] })}>
        {images.map((image, i) => {
          const { imageURL } = image

          return (
            <SwiperSlide key={imageURL + i}>
              <Image alt={imageURL + i} fill src={imageURL} style={{ objectFit: 'contain' }} />
            </SwiperSlide>
          )
        })}
      </Swiper>
      <div className={s.description}>
        {isLoading ? (
          <Loader containerHeight />
        ) : (
          <>
            <UserBanner
              avatar={data?.avatars?.['avatar-medium']?.url}
              name={data?.username || ''}
            />
            <EditPostForm
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

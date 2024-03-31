import { ImageURL, UserBanner } from '@/entities/post'
import { useTranslation } from '@/shared/hooks/useTranslation'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'

import s from './DescriptionScreen.module.scss'

import { getPostSliderConfig } from '../../model/config/getPostSliderConfig'
import { useCreatePost } from '../../model/hooks/useCreatePost'
import { EditPostForm } from '../EditPostForm/EditPostForm'

interface Props {
  images: ImageURL[]
  onCloseModal: () => void
  userAvatar?: Nullable<string>
  userName?: string
}

export const DescriptionScreen = ({ images, onCloseModal, userAvatar, userName }: Props) => {
  const { t } = useTranslation()

  const { createPostRef, handleSubmitCreatePost, isCreatePostLoad } = useCreatePost({
    callback: onCloseModal,
    imagesWithFilters: images,
    t,
  })

  return (
    <div className={s.container}>
      <Swiper {...getPostSliderConfig({ classes: [s.slider] })}>
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
        <UserBanner avatar={userAvatar} name={userName || ''} />
        <EditPostForm
          disabled={isCreatePostLoad}
          onSubmit={handleSubmitCreatePost}
          ref={createPostRef}
          style={{ height: '100%' }}
          titleSubmit={t.pages.post.publish}
        />
      </div>
    </div>
  )
}

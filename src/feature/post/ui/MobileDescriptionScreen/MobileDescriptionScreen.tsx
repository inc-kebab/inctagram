import { postsActions } from '@/entities/post'
import { UserBanner } from '@/entities/user'
import { useGetMyProfileQuery } from '@/feature/profile'
import { getDefaultSwiperConfig } from '@/shared/helpers'
import { useAppDispatch, useAppSelector, useTranslation } from '@/shared/hooks'
import { Loader } from '@/shared/ui/Loader'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'

import s from './MobileDescriptionScreen.module.scss'

import { useCreatePost } from '../../model/hooks/useCreatePost'
import { CurrentWindow } from '../../model/types/post.types'
import { EditPostForm } from '../EditPostForm/EditPostForm'
import { TitleBlock } from '../TitleBlock/TitleBlock'

interface Props {
  onChangeStatus?: (status: boolean) => void
  onChangeWindow?: (window: CurrentWindow) => void
  onCloseModal: () => void
}

export const MobileDescriptionScreen = ({
  onChangeStatus,
  onChangeWindow,
  onCloseModal,
}: Props) => {
  const { t } = useTranslation()

  const dispatch = useAppDispatch()

  const imagesWithFilters = useAppSelector(state => state.posts.imagesWithFilters)

  const { data, isLoading } = useGetMyProfileQuery(undefined)

  const { createPostRef, handleSubmitCreatePost, isCreatePostLoad } = useCreatePost({
    callback: onCloseModal,
    changeStatus: onChangeStatus,
    imagesWithFilters,
    t,
  })

  const handleClickBack = () => {
    onChangeWindow?.('filter')
    dispatch(postsActions.resetImagesWithFilters())
  }

  return (
    <>
      <TitleBlock onBackClick={handleClickBack} showLeftButton title={t.pages.post.publication} />
      <div className={s.container}>
        <Swiper {...getDefaultSwiperConfig({ classes: [s.slider] })}>
          {imagesWithFilters.map((image, i) => {
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
    </>
  )
}

import { useState } from 'react'

import { ExpandBtn, ImageObj, LoadedImagesList, ZoomIn, postsActions } from '@/entities/post'
import { getDefaultSwiperConfig, handleErrorResponse } from '@/shared/helpers'
import { useAppDispatch } from '@/shared/hooks'
import Image from 'next/image'
import { Controller } from 'swiper/modules'
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react'

import s from './CropperPostScreen.module.scss'

import { useDeleteImageMutation } from '../../api/post-api'
import { CurrentWindow } from '../../model/types/post.types'
import { CropperImage } from './CropperImage'

type Props = {
  images: ImageObj[]
  onChangeCurrentWindow?: (window: CurrentWindow) => void
}

export const CropperPostScreen = ({ images, onChangeCurrentWindow }: Props) => {
  const dispatch = useAppDispatch()

  const [controlledSwiper, setControlledSwiper] = useState<SwiperClass | null>(null)

  const [deleteImage] = useDeleteImageMutation() // TODO - MOVE TO EDIT POST LOGIC

  const handleDeleteImage = (imageObj: ImageObj) => {
    if (imageObj.uploadId) {
      // TODO - DELETE UPLOADID IN SLICE
      deleteImage(imageObj.uploadId).then(res => {
        if ('error' in res) {
          handleErrorResponse(res.error)
        }
      })
    }
    dispatch(postsActions.removeImage(imageObj.imageURL))

    if (images.length === 1) {
      onChangeCurrentWindow?.('upload')
    }
  }

  const handleChangeZoom = (imageURL: string) => (zoom: number) => {
    dispatch(postsActions.updateImage({ imageURL, zoom }))
  }

  const handleSetImage = async (imageURL: string) => {
    dispatch(postsActions.addImage(imageURL))
    if (controlledSwiper) {
      await controlledSwiper.updateSlides()
      controlledSwiper.slideTo(controlledSwiper.slides.length)
    }
  }

  const handleSelectSlide = (idx: number) => {
    if (controlledSwiper) {
      controlledSwiper.slideTo(idx)
    }
  }

  return (
    <div className={s.container}>
      <Swiper
        {...getDefaultSwiperConfig({ classes: [s.slider], modules: [Controller] })}
        controller={{ control: controlledSwiper }}
        onSwiper={setControlledSwiper}
        simulateTouch={false}
      >
        {images.map((el, i) => {
          const { aspect, imageURL, zoom } = el

          return (
            <SwiperSlide key={imageURL + i}>
              {aspect === 0 ? (
                <Image alt={`Slide ${i + 1}`} className={s.image} fill src={imageURL} />
              ) : (
                <CropperImage image={el} onChangeZoom={handleChangeZoom(imageURL)} />
              )}
              <div className={s.actions}>
                <ExpandBtn currentAspect={aspect} imageURL={imageURL} />
                <ZoomIn aspect={el.aspect} imageURL={imageURL} zoom={zoom} />
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
      <LoadedImagesList
        classNameTrigger={s.list}
        images={images}
        onDeleteImage={handleDeleteImage}
        onSelectSlide={handleSelectSlide}
        onSetImage={handleSetImage}
      />
    </div>
  )
}

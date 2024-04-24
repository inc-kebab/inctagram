import { useState } from 'react'

import { ImageObj, ZoomIn, postsActions } from '@/entities/post'
import { getDefaultSwiperConfig, handleErrorResponse } from '@/shared/helpers'
import { useAppDispatch } from '@/shared/hooks'
import { MobileExpandPhoto } from '@/widgets/post/ui/MobileCreatePostDialog/MobileExpandPhoto/MobileExpandPhoto'
import { MobileLoadedImagesList } from '@/widgets/post/ui/MobileCreatePostDialog/MobileLoadedImagesList/MobileLoadedImagesList'
import { MobileZoomIn } from '@/widgets/post/ui/MobileCreatePostDialog/MobileZoomIn/MobileZoomIn'
import Image from 'next/image'
import { Controller } from 'swiper/modules'
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react'

import s from './MobileCropperPostScreen.module.scss'

import { useDeleteImageMutation } from '../../api/post-api'
import { CurrentWindow } from '../../model/types/post.types'
import { MobileCropperImage } from './MobileCropperImage'

type Props = {
  images: ImageObj[]
  onChangeCurrentWindow?: (window: CurrentWindow) => void
}

export const MobileCropperPostScreen = ({ images, onChangeCurrentWindow }: Props) => {
  const dispatch = useAppDispatch()

  const [controlledSwiper, setControlledSwiper] = useState<SwiperClass | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const [deleteImage] = useDeleteImageMutation() // TODO - MOVE TO EDIT POST LOGIC

  const handleDeleteImage = (imageObj: ImageObj, index: number) => {
    if (activeIndex === images.length - 1 || activeIndex > index) {
      setActiveIndex(prev => prev - 1)
      controlledSwiper?.slideTo(activeIndex - 1, 0)
    }
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
        onSlideChange={swiper => setActiveIndex(swiper.realIndex)}
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
                <MobileCropperImage image={el} onChangeZoom={handleChangeZoom(imageURL)} />
              )}
            </SwiperSlide>
          )
        })}
      </Swiper>
      <MobileZoomIn
        aspect={images[activeIndex].aspect}
        imageURL={images[activeIndex].imageURL}
        zoom={images[activeIndex].zoom}
      />
      <MobileLoadedImagesList
        classNameTrigger={s.list}
        images={images}
        onDeleteImage={handleDeleteImage}
        onSelectSlide={handleSelectSlide}
        onSetImage={handleSetImage}
      />
      <MobileExpandPhoto
        currentAspect={images[activeIndex].aspect}
        imageURL={images[activeIndex].imageURL}
      />
    </div>
  )
}

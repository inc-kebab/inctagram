import { useState } from 'react'
import { toast } from 'react-toastify'

import { ImageObj, postsActions } from '@/entities/post'
import { MobileExpandPhoto } from '@/entities/post/ui/MobileExpandPhoto/MobileExpandPhoto'
import { MobileLoadedImagesList } from '@/entities/post/ui/MobileLoadedImagesList/MobileLoadedImagesList'
import { MobileZoomIn } from '@/entities/post/ui/MobileZoomIn/MobileZoomIn'
import { TitleBlock } from '@/feature/post/ui/TitleBlock/TitleBlock'
import { getDefaultSwiperConfig, getModifiedImage } from '@/shared/helpers'
import { useAppDispatch, useAppSelector, useTranslation } from '@/shared/hooks'
import Image from 'next/image'
import { Controller } from 'swiper/modules'
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react'

import s from './MobileCropperPostScreen.module.scss'

import { CurrentWindow } from '../../model/types/post.types'
import { CropperImage } from '../CropperPostScreen/CropperImage'

type Props = {
  onChangeWindow?: (window: CurrentWindow) => void
}

export const MobileCropperPostScreen = ({ onChangeWindow }: Props) => {
  const { t } = useTranslation()

  const dispatch = useAppDispatch()

  const [controlledSwiper, setControlledSwiper] = useState<SwiperClass | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const images = useAppSelector(state => state.posts.images)

  const handleSetImage = async (imageURL: string) => {
    dispatch(postsActions.addImage(imageURL))
    if (controlledSwiper) {
      await controlledSwiper.updateSlides()
      controlledSwiper.slideTo(controlledSwiper.slides.length)
    }
  }

  const handleDeleteImage = (imageObj: ImageObj, index: number) => {
    if (activeIndex === images.length - 1 || activeIndex > index) {
      setActiveIndex(prev => prev - 1)
      controlledSwiper?.slideTo(activeIndex - 1, 0)
    } // TODO
    dispatch(postsActions.removeImage(imageObj.imageURL))

    if (images.length === 1) {
      onChangeWindow?.('upload')
    }
  }

  const handleChangeZoom = (imageURL: string) => (zoom: number) => {
    dispatch(postsActions.updateImage({ imageURL, zoom }))
  }

  const handleSelectSlide = (idx: number) => {
    if (controlledSwiper) {
      controlledSwiper.slideTo(idx)
    }
  }

  const handleClickBack = () => {
    onChangeWindow?.('upload')
    dispatch(postsActions.resetImages())
  }

  const handleClickNext = () => {
    const promises = images.map(el => {
      const crop = el.aspect === 0 ? null : el.croppedAreaPixels

      return getModifiedImage({ crop, imageSrc: el.imageURL, mode: 'url', t }) as Promise<string>
    })

    Promise.all(promises)
      .then(images => {
        dispatch(postsActions.setCroppedImages(images))
        onChangeWindow?.('filter')
      })
      .catch(e => toast.error(e.message))
  }

  return (
    <>
      <TitleBlock
        onBackClick={handleClickBack}
        onNextClick={handleClickNext}
        showLeftButton
        showRightButton
        title={t.pages.post.cropping}
      />
      <div className={s.container}>
        <Swiper
          {...getDefaultSwiperConfig({
            classes: [s.slider],
            modules: [Controller],
          })}
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
                  <CropperImage image={el} onChangeZoom={handleChangeZoom(imageURL)} />
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
    </>
  )
}

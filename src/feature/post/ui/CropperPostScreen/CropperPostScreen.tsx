import { useState } from 'react'
import { toast } from 'react-toastify'

import {
  ExpandBtn,
  ImageObj,
  LoadedImagesList,
  MAX_SIZE_IMAGE_20MB,
  ZoomIn,
  postsActions,
  useAddPhoto,
} from '@/entities/post'
import { Close } from '@/shared/assets/icons/common'
import { PlusCircle } from '@/shared/assets/icons/outline'
import { getDefaultSwiperConfig, getModifiedImage, photoSchema } from '@/shared/helpers'
import { useAppDispatch, useAppSelector } from '@/shared/hooks'
import { Button } from '@/shared/ui/Button'
import { InputFile } from '@/shared/ui/InputFile'
import Image from 'next/image'
import { Controller } from 'swiper/modules'
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react'

import s from './CropperPostScreen.module.scss'

import { CurrentWindow } from '../../model/types/post.types'
import { TitleBlock } from '../TitleBlock/TitleBlock'
import { CropperImage } from './CropperImage'

type Props = {
  onChangeWindow?: (window: CurrentWindow) => void
}

export const CropperPostScreen = ({ onChangeWindow }: Props) => {
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

  const { handleSetPhoto, setError, t } = useAddPhoto(handleSetImage, images.length > 9)

  const handleDeleteImage = (imageObj: ImageObj, idx: number) => {
    if (activeIndex === images.length - 1 || activeIndex > idx) {
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
          allowTouchMove={false}
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
                  <Image alt={`Slide ${i + 1}`} fill objectFit="contain" src={imageURL} />
                ) : (
                  <CropperImage image={el} onChangeZoom={handleChangeZoom(imageURL)} />
                )}
              </SwiperSlide>
            )
          })}
        </Swiper>
        <Swiper
          {...getDefaultSwiperConfig({
            classes: [s.sliderPreview],
            navigation: false,
            pagination: false,
            slidesPerView: 3,
          })}
          spaceBetween={5}
        >
          {images.map((el, i) => {
            const { imageURL } = el

            return (
              <SwiperSlide
                key={imageURL + i}
                onClick={() => controlledSwiper?.slideTo(i)}
                style={{ position: 'relative', width: '45px' }}
              >
                <Image
                  alt={`Slide ${imageURL}`}
                  className={s.imagePreview}
                  fill
                  objectFit="cover"
                  src={imageURL}
                />
                <Button
                  className={s.deleteBtn}
                  onClick={() => handleDeleteImage(el, i)}
                  startIcon={<Close className={s.icon} />}
                  variant="text"
                />
              </SwiperSlide>
            )
          })}
        </Swiper>
        <div className={s.actions}>
          <ExpandBtn
            currentAspect={images[activeIndex].aspect}
            imageURL={images[activeIndex].imageURL}
          />
          <ZoomIn
            aspect={images[activeIndex].aspect}
            imageURL={images[activeIndex].imageURL}
            zoom={images[activeIndex].zoom}
          />
          <LoadedImagesList
            classNameTrigger={s.right}
            images={images}
            onDeleteImage={handleDeleteImage}
            onSelectSlide={handleSelectSlide}
            onSetImage={handleSetImage}
          />
          <InputFile
            accept=".png, .jpg, .jpeg"
            classNameLabel={s.rightLabel}
            setError={setError}
            setFile={handleSetPhoto}
            zodSchema={photoSchema(t, MAX_SIZE_IMAGE_20MB)}
          >
            <PlusCircle className={s.rightMobile} />
          </InputFile>
        </div>
      </div>
    </>
  )
}

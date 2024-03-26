import { useEffect, useRef, useState } from 'react'
import Cropper from 'react-easy-crop'

import { useAppDispatch } from '@/app/store/store'
import { ExpandBtn, ImagesArrayBtn } from '@/entities/post'
import { CroppedArea } from '@/feature/profile/model/types/profile.types'
import clsx from 'clsx'
import Image from 'next/image'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './Carousel.scss'

import s from './CropperPost.module.scss'

import { ImageObj, postsActions } from '../../api/post-slice'
import { CurrentWindow } from '../AddPostPhotoDialog/AddPostPhotoDialog'

type Crop = { x: number; y: number }

type Props = {
  cropShape?: 'rect' | 'round'
  currentWindow: CurrentWindow
  disabled?: boolean
  images: ImageObj[]
}

export const CropperPost = ({ currentWindow, disabled, images }: Props) => {
  const dispatch = useAppDispatch()
  const [crop, setCrop] = useState<Crop>({ x: 0, y: 0 })
  const [activeIndex, setActiveIndex] = useState(0)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedArea | null>(null)
  const [zoom, setZoom] = useState(1)
  const [isOpenExpand, setIsOpenExpand] = useState(false)
  const swiperRef = useRef<any>(null)
  const handleCropComplete = (_: Crop, croppedAreaPixels: CroppedArea) => {
    if (croppedAreaPixels) {
      setCroppedAreaPixels(croppedAreaPixels)
      const imageWithCroppedAreaPixels: ImageObj = { ...images[activeIndex], croppedAreaPixels }

      dispatch(
        postsActions.setImages(
          images.map(image =>
            image.imageURL === imageWithCroppedAreaPixels.imageURL
              ? imageWithCroppedAreaPixels
              : image
          )
        )
      )
    }
  }

  const navigateToLastSlide = () => {
    const swiperInstance = swiperRef.current

    if (swiperInstance && swiperInstance.slides) {
      swiperInstance.slideTo(swiperInstance.slides.length - 1)
    }
  }

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.allowTouchMove = !isOpenExpand
    }
  }, [isOpenExpand])

  return (
    <div className={s.container}>
      <div className={clsx(s.wrapper, currentWindow !== 'expand' && s.extendedWrapper)}>
        <Swiper
          className="post-single-slider"
          modules={[Navigation, Pagination]}
          navigation
          onSlideChange={swiper => {
            setActiveIndex(swiper.activeIndex)
          }}
          onSwiper={swiper => {
            swiperRef.current = swiper
          }}
          pagination={{ clickable: true }}
          ref={swiperRef}
          slidesPerView={1}
          spaceBetween={0}
          style={{ height: '100%', width: '100%' }}
        >
          {images.map((image, i) => (
            <SwiperSlide key={image.imageURL + i} style={{ position: 'relative' }}>
              {image.aspect === 0 && <Image alt="" fill objectFit="cover" src={image.imageURL} />}
              {image.aspect > 0 && (
                <Cropper
                  aspect={image.aspect}
                  crop={crop}
                  cropShape="rect"
                  image={image.imageURL}
                  objectFit="cover"
                  onCropChange={setCrop}
                  onCropComplete={handleCropComplete}
                  onZoomChange={setZoom}
                  showGrid={false}
                  zoom={zoom}
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        {currentWindow === 'expand' && (
          <>
            <ExpandBtn
              activeIndex={activeIndex}
              className={s.expandBtn}
              images={images}
              isOpenExpand={isOpenExpand}
              setIsOpenExpand={setIsOpenExpand}
            />
            <ImagesArrayBtn
              className={s.imagesArrayBtn}
              images={images}
              navigateToLastSlide={navigateToLastSlide}
            />
          </>
        )}
      </div>
      {currentWindow === 'filter' && (
        <div style={{ alignItems: 'center', display: 'flex', margin: '0 auto ' }}>
          FILTER WINDOW
        </div>
      )}
      {currentWindow === 'description' && (
        <div style={{ alignItems: 'center', display: 'flex', margin: '0 auto ' }}>
          DESCRIPTION WINDOW
        </div>
      )}
    </div>
  )
}

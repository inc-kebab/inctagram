import { useEffect, useRef, useState } from 'react'
import Cropper from 'react-easy-crop'

import { useAppDispatch, useAppSelector } from '@/app/store/store'
import { ExpandBtn, ImageObj, ImagesArrayBtn, ZoomIn, postsActions } from '@/entities/post'
import { CroppedArea } from '@/feature/profile/model/types/profile.types'
import clsx from 'clsx'
import Image from 'next/image'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import './Carousel.scss'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import s from './CropperPost.module.scss'

import { CurrentWindow } from '../AddPostPhotoDialog/AddPostPhotoDialog'
import { Description } from '../Description/Description'
import { Filters } from '../Filters/Filters'

type Crop = { x: number; y: number }

type Props = {
  cropShape?: 'rect' | 'round'
  currentWindow: CurrentWindow
  disabled?: boolean
  images: ImageObj[]
}

export const CropperPost = ({ currentWindow, disabled }: Props) => {
  const dispatch = useAppDispatch()
  const images = useAppSelector(state => state.posts.images)

  const [crop, setCrop] = useState<Crop>({ x: 0, y: 0 })
  const [activeIndex, setActiveIndex] = useState(0)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedArea | null>(null)
  const [zoom, setZoom] = useState(1)
  const [isOpenExpand, setIsOpenExpand] = useState(false)
  const [isOpenZoom, setIsOpenZoom] = useState(false)
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
      swiperRef.current.allowTouchMove = !(isOpenZoom || isOpenExpand)
    }
  }, [isOpenZoom, isOpenExpand])

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
          {images.map((image, i) => {
            const { aspect, filter, imageURL } = image

            return (
              <SwiperSlide key={imageURL + i} style={{ position: 'relative' }}>
                {image.aspect === 0 && (
                  <Image
                    alt={filter}
                    className={filter}
                    fill
                    src={imageURL}
                    style={{ objectFit: 'cover' }}
                  />
                )}
                {(aspect > 0 || isOpenZoom) && (
                  <Cropper
                    aspect={aspect}
                    crop={crop}
                    cropShape="rect"
                    image={imageURL}
                    objectFit="cover"
                    onCropChange={setCrop}
                    onCropComplete={handleCropComplete}
                    onZoomChange={setZoom}
                    showGrid={false}
                    zoom={zoom}
                  />
                )}
              </SwiperSlide>
            )
          })}
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
            <ZoomIn
              activeIndex={activeIndex}
              className={s.zoomInBtn}
              images={images}
              isOpenZoom={isOpenZoom}
              setIsOpenZoom={setIsOpenZoom}
              setZoom={setZoom}
              zoom={zoom}
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
        <div style={{ alignItems: 'center', display: 'flex', margin: '0 auto' }}>
          <Filters activeIndex={activeIndex} images={images} />
        </div>
      )}
      {currentWindow === 'description' && (
        <div style={{ alignItems: 'center', display: 'flex', margin: '0 auto ' }}>
          <Description />
        </div>
      )}
    </div>
  )
}

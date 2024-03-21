import { ComponentPropsWithoutRef } from 'react'

import clsx from 'clsx'
import Image from 'next/image'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react'

import './Carousel.scss'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export type ImagesUrlData = {
  url: string
}

export type Props = {
  imagesUrl: ImagesUrlData[]
} & Omit<SwiperProps, 'modules' | 'navigation' | 'pagination' | 'slidesPerView' | 'spaceBetween'>

export const Carousel = ({ className, imagesUrl, ...props }: Props) => {
  return (
    <Swiper
      className={clsx('post-single-slider', className)}
      modules={[Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      slidesPerView={1}
      spaceBetween={10}
      {...props}
    >
      {imagesUrl?.map((image, index) => {
        return (
          <SwiperSlide key={index} style={{ position: 'relative' }}>
            <Image
              alt={`Slide ${index}`}
              fill
              priority
              sizes="70vw"
              src={image.url}
              style={{ objectFit: 'contain' }}
            />
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}

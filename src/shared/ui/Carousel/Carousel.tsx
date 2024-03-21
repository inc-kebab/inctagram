import Image from 'next/image'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './Carousel.scss'

export type ImagesUrlData = {
  url: string
}

export type Props = {
  imagesUrl: ImagesUrlData[]
}

export const Carousel = ({ imagesUrl }: Props) => {
  return (
    <Swiper
      className="post-single-slider"
      modules={[Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      slidesPerView={1}
      spaceBetween={10}
      style={{ height: '100%', width: '100%' }}
    >
      {imagesUrl?.map((image: any, index: number) => {
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

import { useCallback, useMemo, useState } from 'react'

import { useAppDispatch } from '@/app/store/store'
import { CroppedImage, postsActions } from '@/entities/post'
import { FilterImage } from '@/shared/helpers/getCroppedImage'
import clsx from 'clsx'
import Image from 'next/image'
import { Controller, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react'

import s from './FiltersScreen.module.scss'

const filtersScreen: { name: string; value: FilterImage }[] = [
  { name: 'Normal', value: 'image_filter--normal' },
  { name: 'Clarendon', value: 'image_filter--clarendon' },
  { name: 'Lark', value: 'image_filter--lark' },
  { name: 'Gingham', value: 'image_filter--gingham' },
  { name: 'Moon', value: 'image_filter--moon' },
  { name: 'Xray', value: 'image_filter--xRay' },
  { name: 'Shabby', value: 'image_filter--shabby' },
  { name: 'Old school', value: 'image_filter--oldSchool' },
  { name: 'Silent Hill', value: 'image_filter--silentHill' },
]

type Props = {
  croppedImages: CroppedImage[]
}

export const FiltersScreen = ({ croppedImages }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const dispatch = useAppDispatch()

  const [controlledSwiper, setControlledSwiper] = useState<SwiperClass | null>(null)

  const handleChangeFilter = useCallback(
    (filter: FilterImage) => {
      const imageURL = croppedImages[activeIndex].imageURL

      dispatch(postsActions.updateFilterCroppedImage({ filter, imageURL }))
    },
    [activeIndex, croppedImages, dispatch]
  )

  const filtersArray = useMemo(() => {
    return filtersScreen.map((filter, i) => {
      const activeFilter = filter.value === croppedImages[activeIndex].filter

      return (
        <div
          className={clsx(s.filter, { [s.active]: activeFilter })}
          key={`${filter.name}` + i}
          onClick={() => handleChangeFilter(filter.value)}
        >
          <Image
            alt={filter.name}
            className={clsx(filter.value, s.item)}
            height={100}
            src={croppedImages[activeIndex].imageURL}
            width={100}
          />
          <div className={s.name}>{filter.name}</div>
        </div>
      )
    })
  }, [croppedImages, activeIndex, handleChangeFilter])

  return (
    <div className={s.container}>
      <Swiper
        className="post-single-slider"
        controller={{ control: controlledSwiper }}
        modules={[Navigation, Pagination, Controller]}
        navigation
        onSlideChange={swiper => setActiveIndex(swiper.activeIndex)}
        onSwiper={setControlledSwiper}
        pagination={{ clickable: true }}
        simulateTouch={false}
        slidesPerView={1}
        spaceBetween={0}
        style={{ height: '100%', width: '50%' }}
      >
        {croppedImages.map((image, i) => {
          const { filter, imageURL } = image

          return (
            <SwiperSlide key={imageURL + i}>
              <Image
                alt={filter}
                className={filter}
                fill
                src={imageURL}
                style={{ objectFit: 'contain' }}
              />
            </SwiperSlide>
          )
        })}
      </Swiper>
      <div className={s.filtersContainer}>{filtersArray}</div>
    </div>
  )
}

import { useCallback, useMemo, useState } from 'react'
import { toast } from 'react-toastify'

import { postsActions } from '@/entities/post'
import { CurrentWindow } from '@/feature/post'
import { filters } from '@/feature/post/model/const/filters'
import { FilterBlock } from '@/feature/post/ui/FilterBlock/FilterBlock'
import { TitleBlock } from '@/feature/post/ui/TitleBlock/TitleBlock'
import { FilterImage, getDefaultSwiperConfig, getModifiedImage } from '@/shared/helpers'
import { useAppDispatch, useAppSelector, useTranslation } from '@/shared/hooks'
import Image from 'next/image'
import { Controller } from 'swiper/modules'
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react'

import s from './MobileFiltersScreen.module.scss'

type Props = {
  onChangeWindow?: (window: CurrentWindow) => void
}

export const MobileFiltersScreen = ({ onChangeWindow }: Props) => {
  const { t } = useTranslation()

  const dispatch = useAppDispatch()

  const [controlledSwiper, setControlledSwiper] = useState<SwiperClass | null>(null)

  const [activeIndex, setActiveIndex] = useState(0)

  const croppedImages = useAppSelector(state => state.posts.croppedImages)

  const handleChangeFilter = useCallback(
    (filter: FilterImage) => {
      const imageURL = croppedImages[activeIndex].imageURL

      dispatch(postsActions.updateFilterCroppedImage({ filter, imageURL }))
    },
    [activeIndex, croppedImages, dispatch]
  )

  const filtersArray = useMemo(() => {
    return filters.map((filter, i) => {
      const isActiveFilter = filter.value === croppedImages[activeIndex].filter

      return (
        <FilterBlock
          filter={filter}
          imageURL={croppedImages[activeIndex].imageURL}
          isActive={isActiveFilter}
          key={`${filter.name}` + i}
          onSetActiveFilter={() => handleChangeFilter(filter.value)}
        />
      )
    })
  }, [croppedImages, activeIndex, handleChangeFilter])

  const handleClickBack = () => {
    onChangeWindow?.('expand')
    dispatch(postsActions.resetCroppedImages())
  }

  const handleClickNext = () => {
    const promises = croppedImages.map(el => {
      return getModifiedImage({
        filter: el.filter,
        imageSrc: el.imageURL,
        mode: 'filters',
        t,
      }) as Promise<string>
    })

    Promise.all(promises)
      .then(images => {
        dispatch(postsActions.setImagesWithFilters(images))
        onChangeWindow?.('description')
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
        title={t.pages.post.filters}
      />
      <div className={s.container}>
        <Swiper
          {...getDefaultSwiperConfig({
            classes: [s.slider],
            modules: [Controller],
          })}
          controller={{ control: controlledSwiper }}
          onSlideChange={swiper => setActiveIndex(swiper.activeIndex)}
          onSwiper={setControlledSwiper}
        >
          {croppedImages.map((image, i) => {
            const { filter, imageURL } = image

            return (
              <SwiperSlide className={s.slide} key={imageURL + i}>
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
    </>
  )
}

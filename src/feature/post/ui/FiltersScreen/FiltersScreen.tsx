import { useCallback, useMemo, useState } from 'react'
import { toast } from 'react-toastify'

import {
  DraftPost,
  FilterBlock,
  ScreenWrapper,
  TitleBlock,
  filters,
  postsActions,
} from '@/entities/post'
import { Stores, getStoreData, updateDraftPost } from '@/entities/post/model/services/saveDraftPost'
import { FilterImage, getDefaultSwiperConfig, getModifiedImage } from '@/shared/helpers'
import { useAppDispatch, useAppSelector, useTranslation } from '@/shared/hooks'
import Image from 'next/image'
import { Controller } from 'swiper/modules'
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react'

import s from './FiltersScreen.module.scss'

export const FiltersScreen = () => {
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
    dispatch(postsActions.setWindow('expand'))
    dispatch(postsActions.resetCroppedImages())
  }

  const handleClickNext = () => {
    const promises = croppedImages.map(el => {
      return getModifiedImage({
        filter: el.filter,
        imageSrc: el.imageURL,
        mode: 'filters',
        t,
      }) as Promise<Blob>
    })

    Promise.all(promises)
      .then(images => {
        getStoreData<DraftPost>(Stores.DRAFT_POST)
          .then(res => res[0])
          .then(res =>
            updateDraftPost<DraftPost>(Stores.DRAFT_POST, {
              ...res,
              imagesWithFilters: images,
              window: 'description',
            })
          )

        dispatch(postsActions.setImagesWithFilters(images))
        dispatch(postsActions.setWindow('description'))
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
      <ScreenWrapper>
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
      </ScreenWrapper>
    </>
  )
}

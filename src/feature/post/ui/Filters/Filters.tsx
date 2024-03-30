import { useCallback, useMemo, useState } from 'react'

import { useAppDispatch } from '@/app/store/store'
import { ImageObjWithFilter, postsActions } from '@/feature/post/api/post-slice'
import clsx from 'clsx'
import Image from 'next/image'

import s from './Filters.module.scss'

import { filtersList } from './filtersList'

type Props = {
  activeIndex: number
  images: ImageObjWithFilter[]
}

type Filter = {
  className: string
  name: string
}

export const Filters = (props: Props) => {
  const { activeIndex, images } = props
  const dispatch = useAppDispatch()
  const imageObj = images[activeIndex]
  const initialActiveFilters = useMemo(
    () => new Array(images.length).fill('normal'),
    [images.length]
  )
  const [activeFilters, setActiveFilters] = useState<string[]>(initialActiveFilters)

  const setImageFilter = useCallback(
    (filter: Filter, activeIndex: number) => {
      const { className } = filter
      const { imageURL } = imageObj
      const newActiveFilters = [...activeFilters]

      newActiveFilters[activeIndex] = className
      setActiveFilters(newActiveFilters)

      dispatch(
        postsActions.setFilterToImage({
          filter: className,
          imageUrl: imageURL,
        })
      )
    },
    [dispatch, activeFilters, imageObj]
  )

  return (
    <div className={s.filtersContainer}>
      {filtersList.map((filter, i) => {
        const { className } = filter

        return (
          <div
            className={s.imageGroup}
            key={`imageObj.imageURL-${i}`}
            onClick={() => {
              setImageFilter(filter, activeIndex)
            }}
          >
            <Image
              alt={filter.name}
              className={className}
              height={100}
              src={imageObj.imageURL}
              style={{
                objectFit: 'cover',
              }}
              width={100}
            />
            <div
              className={clsx(s.name, {
                [s.activeFilter]: activeFilters[activeIndex] === className,
              })}
            >
              {filter.name}
            </div>
          </div>
        )
      })}
    </div>
  )
}

import clsx from 'clsx'
import Image from 'next/image'

import s from './FilterBlock.module.scss'

import { FilterPost } from '../../model/types/post.types'

interface Props {
  filter: FilterPost
  imageURL: string
  isActive: boolean
  onSetActiveFilter: () => void
}

export const FilterBlock = ({ filter, imageURL, isActive, onSetActiveFilter }: Props) => {
  return (
    <div className={clsx(s.filter, { [s.active]: isActive })} onClick={onSetActiveFilter}>
      <Image
        alt={filter.name}
        className={clsx(filter.value, s.item)}
        height={100}
        src={imageURL}
        width={100}
      />
      <div className={s.name}>{filter.name}</div>
    </div>
  )
}

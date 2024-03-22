'use client'
import { ComponentPropsWithoutRef } from 'react'

import { useAppSelector } from '@/app/store/store'
import { useAddImages } from '@/feature/post/model/hooks/useAddImages'
import { AddPostPhotoDialog } from '@/feature/post/ui/AddPostPhotoDialog/AddPostPhotoDialog'
import { CroppedArea } from '@/feature/profile/model/types/profile.types'
import { getCroppedImg } from '@/feature/profile/model/utils/getCroppedImg'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Button } from '@/shared/ui/Button'
import clsx from 'clsx'
import Link from 'next/link'

import s from './SidebarItem.module.scss'

import { SidebarElement } from '../../model/types/sidebar'

type Props = {
  disabled?: boolean
  isActive?: boolean
  isLastGroupItem?: boolean
  isLink?: boolean
  item: SidebarElement
} & Omit<ComponentPropsWithoutRef<'li'>, 'children'>

export const SidebarItem = ({
  disabled,
  isActive,
  isLastGroupItem,
  isLink,
  item,
  ...rest
}: Props) => {
  const { t } = useTranslation()
  const { handleAddPhoto } = useAddImages()

  const images = useAppSelector(state => state.posts.images)

  const handleUpdatePhoto = (cropArea?: CroppedArea) => {
    images.map(
      image => getCroppedImg({ crop: cropArea, fileName: 'files', imageSrc: image.imageURL, t })
      // .then(res =>
      //   handleAddPhoto(res)
      // )
    )
  }

  return (
    <li className={clsx(s.item, { [s.lastGroupItem]: isLastGroupItem })} {...rest}>
      {isLink ? (
        <Link
          className={clsx(s.link, {
            [s.active]: isActive,
            [s.disabled]: disabled,
            [s.full]: item.title && item.icon,
          })}
          href={item.href}
        >
          {isActive ? item.activeIcon || item.icon : item.icon}
          <span className={s.title}>{item.title}</span>
        </Link>
      ) : (
        <AddPostPhotoDialog
          images={images}
          onSetCroppedArea={handleUpdatePhoto}
          title={images.length === 0 ? 'Add Photo' : 'Cropping'}
          trigger={
            <Button
              className={clsx(s.button, {
                [s.disabled]: disabled,
                [s.full]: item.title && item.icon,
              })}
              variant="text"
            >
              {item.icon}
              <span className={s.title}>{item.title}</span>
            </Button>
          }
          variant={images.length === 0 ? 'profile' : 'post'}
        />
      )}
    </li>
  )
}

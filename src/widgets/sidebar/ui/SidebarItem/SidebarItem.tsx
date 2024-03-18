'use client'
import { ComponentPropsWithoutRef, useState } from 'react'

import { useAddImages } from '@/feature/posts/model/hooks/useAddImages'
import { AddPostPhotoDialog } from '@/feature/posts/ui/AddPostPhotoDialog/AddPostPhotoDialog'
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
  const [imageURL, setImageURL] = useState('')
  const { handleAddPhoto } = useAddImages()

  const handleUpdatePhoto = (cropArea: CroppedArea) => {
    if (cropArea) {
      getCroppedImg({ crop: cropArea, fileName: 'files', imageSrc: imageURL, t }).then(res =>
        handleAddPhoto(res)
      )
    }
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
          imageURL={imageURL}
          onImageURL={setImageURL}
          onSetCroppedArea={handleUpdatePhoto}
          title={imageURL.length === 0 ? t.pages.profile.addPhoto : t.pages.profile.cropping}
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
          variant={imageURL.length === 0 ? 'profile' : 'post'}
        />
      )}
    </li>
  )
}

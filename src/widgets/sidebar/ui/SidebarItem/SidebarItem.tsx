'use client'
import { ComponentPropsWithoutRef, useState } from 'react'

import { useAddImages } from '@/feature/posts/model/hooks/useAddImages'
import { CroppedArea } from '@/feature/profile/model/types/profile.types'
import { getCroppedImg } from '@/feature/profile/model/utils/getCroppedImg'
import { AddProfilePhotoDialog } from '@/feature/profile/ui/AddProfilePhotoDialog/AddProfilePhotoDialog'
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
  const [avatarUrl, setAvatarUrl] = useState('')
  const { handleAddPhoto, isUpdateLoading, isUpdateSuccess } = useAddImages()
  const handleUpdatePhoto = (cropArea: CroppedArea) => {
    if (cropArea) {
      getCroppedImg({ crop: cropArea, fileName: 'file', imageSrc: avatarUrl, t }).then(res =>
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
        <AddProfilePhotoDialog
          avatarUrl={avatarUrl}
          onAvatarUrl={setAvatarUrl}
          onSetCroppedArea={handleUpdatePhoto}
          title={t.pages.profile.addPhoto}
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
        />
      )}
    </li>
  )
}

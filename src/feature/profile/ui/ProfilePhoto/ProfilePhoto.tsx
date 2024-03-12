import { useState } from 'react'

import Close from '@/shared/assets/icons/common/close.svg'
import ImageIcon from '@/shared/assets/icons/fill/image.svg'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Button } from '@/shared/ui/Button'
import clsx from 'clsx'
import Image from 'next/image'

import s from './ProfilePhoto.module.scss'

import { CroppedArea } from '../../model/types/profile.types'
import { getCroppedImg } from '../../model/utils/getCroppedImg'
import { AddProfilePhotoDialog } from '../AddProfilePhotoDialog/AddProfilePhotoDialog'
import { DeletePhotoDialog } from '../DeletePhotoDialog/DeletePhotoDialog'

type Props = {
  avaUrlFromServer?: string
  className?: string
  disabledDelete?: boolean
  disabledUpdate?: boolean
  onDeletePhoto: () => void
  onUpdatePhoto: (data: FormData) => void
}

export const ProfilePhoto = ({
  avaUrlFromServer,
  className,
  disabledDelete,
  disabledUpdate,
  onDeletePhoto,
  onUpdatePhoto,
}: Props) => {
  const { t } = useTranslation()

  const [avatarUrl, setAvatarUrl] = useState('')

  const [openDelete, setOpenDelete] = useState(false)
  const [openAdd, setOpenAdd] = useState(false)

  const handleChangeOpenAdd = (open: boolean) => {
    setOpenAdd(open)
    setAvatarUrl('')
  }

  const handleDeletePhoto = () => {
    setOpenDelete(false)
    onDeletePhoto()
  }

  const handleUpdatePhoto = (cropArea: CroppedArea) => {
    if (cropArea) {
      getCroppedImg({ crop: cropArea, fileName: 'file', imageSrc: avatarUrl, t }).then(res =>
        onUpdatePhoto(res)
      )
    }
  }

  return (
    <div className={clsx(s.container, className)}>
      <div className={s.circle}>
        {avaUrlFromServer ? (
          <div className={s.avatarWpapper}>
            <Image
              alt="profile avatar"
              className={s.avatar}
              height={192}
              src={avaUrlFromServer}
              width={192}
            />
            <DeletePhotoDialog
              confirmCallback={handleDeletePhoto}
              disabled={disabledDelete}
              open={openDelete}
              setOpen={setOpenDelete}
              trigger={
                <Button className={s.deleteAvatar} variant="text">
                  <Close className={s.closeIcon} viewBox="0 0 24 24" />
                </Button>
              }
            />
          </div>
        ) : (
          <div className={s.iconWrapper}>
            <ImageIcon className={s.image} />
          </div>
        )}
      </div>
      <AddProfilePhotoDialog
        avatarUrl={avatarUrl}
        disabled={disabledUpdate}
        onAvatarUrl={setAvatarUrl}
        onOpenChange={handleChangeOpenAdd}
        onSetCroppedArea={handleUpdatePhoto}
        open={openAdd}
        trigger={
          <Button asComponent="button" variant="outline">
            {t.pages.profile.addProfilePhoto}
          </Button>
        }
      />
    </div>
  )
}

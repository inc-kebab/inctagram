import { useEffect, useState } from 'react'

import { ConfirmDialog } from '@/entities/dialog'
import { Close } from '@/shared/assets/icons/common'
import { getModifiedImage, photoSchema } from '@/shared/helpers'
import { useTranslation } from '@/shared/hooks'
import { Avatar } from '@/shared/ui/Avatar'
import { Button } from '@/shared/ui/Button'
import { Dialog } from '@/shared/ui/Dialog'
import { PhotoUploader } from '@/shared/ui/PhotoUploader'
import clsx from 'clsx'

import s from './ProfilePhoto.module.scss'

import { CropperPhoto } from '../CropperPhoto/CropperPhoto'

type Props = {
  avaUrlFromServer?: string
  className?: string
  disabledDelete?: boolean
  disabledUpdate?: boolean
  isSuccessUpdate?: boolean
  onDeletePhoto: () => void
  onUpdatePhoto: (data: FormData) => void
}

export const ProfilePhoto = ({
  avaUrlFromServer,
  className,
  disabledDelete,
  disabledUpdate,
  isSuccessUpdate,
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

  const handleSetPhoto = (file: File) => {
    setAvatarUrl(URL.createObjectURL(file))
  }

  const handleDeletePhoto = () => {
    setOpenDelete(false)
    onDeletePhoto()
  }

  const handleUpdatePhoto = (cropArea: CroppedArea) => {
    if (cropArea) {
      getModifiedImage({ crop: cropArea, fileName: 'file', imageSrc: avatarUrl, t }).then(res =>
        onUpdatePhoto(res as FormData)
      )
    }
  }

  useEffect(() => {
    if (isSuccessUpdate) {
      setOpenAdd(false)
    }
  }, [isSuccessUpdate])

  return (
    <div className={clsx(s.container, className)}>
      <div className={s.circle}>
        <div className={s.avatarWpapper}>
          <Avatar avatarUrl={avaUrlFromServer} circle wrapperSize={192} />
          {avaUrlFromServer && (
            <ConfirmDialog
              confirmCallback={handleDeletePhoto}
              content={t.pages.profile.deleteProfilePhoto}
              disabled={disabledDelete}
              onOpenChange={setOpenDelete}
              open={openDelete}
              title={t.pages.profile.deletePhoto}
              trigger={
                <Button className={s.deleteAvatar} variant="text">
                  <Close className={s.closeIcon} viewBox="0 0 24 24" />
                </Button>
              }
            />
          )}
        </div>
      </div>
      <Dialog
        className={s.dialog}
        onOpenChange={handleChangeOpenAdd}
        open={openAdd}
        title={t.pages.profile.addProfilePhoto}
        trigger={
          <Button asComponent="button" variant="outline">
            {t.pages.profile.addProfilePhoto}
          </Button>
        }
      >
        {avatarUrl ? (
          <CropperPhoto
            avatarUrl={avatarUrl}
            disabled={disabledUpdate}
            onSetCroppedArea={handleUpdatePhoto}
          />
        ) : (
          <PhotoUploader setPhoto={handleSetPhoto} zodSchema={photoSchema(t)} />
        )}
      </Dialog>
    </div>
  )
}

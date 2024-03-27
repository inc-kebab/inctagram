import { useEffect, useState } from 'react'

import Close from '@/shared/assets/icons/common/close.svg'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Avatar } from '@/shared/ui/Avatar'
import { Button } from '@/shared/ui/Button'
import { ConfirmDialog } from '@/widgets/dialogs'
import clsx from 'clsx'

import s from './ProfilePhoto.module.scss'

import { CroppedArea } from '../../model/types/profile.types'
import { getCroppedImg } from '../../model/utils/getCroppedImg'
import { AddProfilePhotoDialog } from '../AddProfilePhotoDialog/AddProfilePhotoDialog'

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

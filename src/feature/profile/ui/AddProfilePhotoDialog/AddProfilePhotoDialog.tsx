import { useState } from 'react'

import { CropperPhoto, InputPhoto } from '@/feature/profile'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Dialog } from '@/shared/ui/Dialog'

import s from './AddProfilePhotoDialog.module.scss'

type Props = {
  addAvatar: (data: FormData) => void
  disabled: boolean
  isSuccess: boolean
  onOpenChange: (open: boolean) => void
  open: boolean
}

export const AddProfilePhotoDialog = ({ isSuccess, onOpenChange, open, ...rest }: Props) => {
  const { t } = useTranslation()
  const [avatarUrl, setAvatarUrl] = useState('')

  const openChangeHandler = (open: boolean) => {
    onOpenChange(open)
    setAvatarUrl('')
  }

  const onSetAvatar = (file: File) => {
    setAvatarUrl(URL.createObjectURL(file))
  }

  return (
    <Dialog
      className={s.dialog}
      onOpenChange={openChangeHandler}
      open={!isSuccess || open}
      title={t.pages.profile.addProfilePhoto}
    >
      {avatarUrl ? (
        <CropperPhoto avatarUrl={avatarUrl} {...rest} />
      ) : (
        <InputPhoto setPhoto={onSetAvatar} />
      )}
    </Dialog>
  )
}

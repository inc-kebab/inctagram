import { useState } from 'react'

import { CropperPhoto, InputPhoto } from '@/feature/profile'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Dialog } from '@/shared/ui/Dialog'

import s from './AddProfilePhotoDialog.module.scss'

type Props = {
  // addAvatar: (data: FormData) => Promise<any>
  addAvatarHandler: (size: any) => void
  avatarUrl: string
  disabled: boolean
  isSuccess: boolean
  onAvatarUrl: (url: string) => void
  onOpenChange: (open: boolean) => void
  open: boolean
}

export const AddProfilePhotoDialog = ({
  addAvatarHandler,
  avatarUrl,
  isSuccess,
  onAvatarUrl,
  onOpenChange,
  open,
  ...rest
}: Props) => {
  const { t } = useTranslation()

  const onSetAvatar = (file: File) => {
    onAvatarUrl(URL.createObjectURL(file))
  }

  return (
    <Dialog
      className={s.dialog}
      onOpenChange={onOpenChange}
      open={open}
      title={t.pages.profile.addProfilePhoto}
    >
      {avatarUrl ? (
        <CropperPhoto addAvatarHandler={addAvatarHandler} avatarUrl={avatarUrl} {...rest} />
      ) : (
        <InputPhoto setPhoto={onSetAvatar} />
      )}
    </Dialog>
  )
}

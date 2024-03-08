import { useState } from 'react'

import { CropperPhoto, InputPhoto } from '@/feature/profile'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Dialog } from '@/shared/ui/Dialog'

import s from './AddProfilePhotoDialog.module.scss'

type Props = {
  avatarUrl: string
  onOpenChange: (open: boolean) => void
  open: boolean
}

export const AddProfilePhotoDialog = ({ avatarUrl, onOpenChange, open }: Props) => {
  const { t } = useTranslation()
  const [photo, setPhoto] = useState<File>()

  return (
    <Dialog
      className={s.dialog}
      onOpenChange={onOpenChange}
      open={open}
      title={t.pages.profile.addProfilePhoto}
    >
      {photo ? (
        <CropperPhoto photo={photo} />
      ) : (
        <InputPhoto avatarUrl={avatarUrl} setPhoto={setPhoto} />
      )}
    </Dialog>
  )
}

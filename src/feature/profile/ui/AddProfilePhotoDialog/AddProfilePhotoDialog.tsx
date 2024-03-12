import { ReactNode } from 'react'

import { useTranslation } from '@/shared/hooks/useTranslation'
import { Dialog } from '@/shared/ui/Dialog'

import s from './AddProfilePhotoDialog.module.scss'

import { CroppedArea } from '../../model/types/profile.types'
import { CropperPhoto } from '../CropperPhoto/CropperPhoto'
import { InputPhoto } from '../InputPhoto/InputPhoto'

type Props = {
  avatarUrl: string
  disabled?: boolean
  onAvatarUrl: (url: string) => void
  onOpenChange: (open: boolean) => void
  onSetCroppedArea: (size: CroppedArea) => void
  open: boolean
  trigger: ReactNode
}

export const AddProfilePhotoDialog = ({
  avatarUrl,
  onAvatarUrl,
  onOpenChange,
  onSetCroppedArea,
  open,
  trigger,
  ...rest
}: Props) => {
  const { t } = useTranslation()

  const handleSetPhoto = (file: File) => {
    onAvatarUrl(URL.createObjectURL(file))
  }

  return (
    <Dialog
      className={s.dialog}
      onOpenChange={onOpenChange}
      open={open}
      title={t.pages.profile.addProfilePhoto}
      trigger={trigger}
    >
      {avatarUrl ? (
        <CropperPhoto avatarUrl={avatarUrl} onSetCroppedArea={onSetCroppedArea} {...rest} />
      ) : (
        <InputPhoto setPhoto={handleSetPhoto} />
      )}
    </Dialog>
  )
}

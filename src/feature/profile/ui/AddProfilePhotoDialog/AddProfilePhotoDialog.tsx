import { ReactNode } from 'react'

import { photoSchema } from '@/shared/helpers/validators/photoSchema'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Dialog } from '@/shared/ui/Dialog'
import { PhotoUploader } from '@/shared/ui/PhotoUploader'

import s from './AddProfilePhotoDialog.module.scss'

import { CropperPhoto } from '../CropperPhoto/CropperPhoto'

type Props = {
  avatarUrl: string
  disabled?: boolean
  onAvatarUrl: (url: string) => void
  onOpenChange?: (open: boolean) => void
  onSetCroppedArea: (size: CroppedArea) => void
  open?: boolean
  title?: string
  trigger: ReactNode
}

export const AddProfilePhotoDialog = ({
  avatarUrl,
  onAvatarUrl,
  onOpenChange,
  onSetCroppedArea,
  open,
  title,
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
      title={title}
      trigger={trigger}
    >
      {avatarUrl ? (
        <CropperPhoto avatarUrl={avatarUrl} onSetCroppedArea={onSetCroppedArea} {...rest} />
      ) : (
        <PhotoUploader setPhoto={handleSetPhoto} zodSchema={photoSchema(t)} />
      )}
    </Dialog>
  )
}

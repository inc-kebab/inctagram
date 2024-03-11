import { CroppedArea, CropperPhoto, InputPhoto } from '@/feature/profile'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Dialog } from '@/shared/ui/Dialog'

import s from './AddProfilePhotoDialog.module.scss'

type Props = {
  avatarUrl: string
  disabled: boolean
  onAvatarUrl: (url: string) => void
  onOpenChange: (open: boolean) => void
  onSetCroppedArea: (size: CroppedArea) => void
  open: boolean
}

export const AddProfilePhotoDialog = ({
  avatarUrl,
  onAvatarUrl,
  onOpenChange,
  onSetCroppedArea,
  open,
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
    >
      {avatarUrl ? (
        <CropperPhoto avatarUrl={avatarUrl} onSetCroppedArea={onSetCroppedArea} {...rest} />
      ) : (
        <InputPhoto setPhoto={handleSetPhoto} />
      )}
    </Dialog>
  )
}

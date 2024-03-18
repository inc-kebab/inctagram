import { ReactNode } from 'react'

import { Dialog } from '@/shared/ui/Dialog'

import s from './AddPostPhotoDialog.module.scss'

import { CroppedArea } from '../../../profile/model/types/profile.types'
import { InputPhoto } from '../../../profile/ui/InputPhoto/InputPhoto'
import { CropperPost } from '../CropperPost/CropperPost'

type Props = {
  arr?: string[]
  disabled?: boolean
  imageURL: string
  onImageURL: (url: string) => void
  onOpenChange?: (open: boolean) => void
  onSetCroppedArea: (size: CroppedArea) => void
  open?: boolean
  title?: string
  trigger: ReactNode
  variant?: 'post' | 'profile'
}

export const AddPostPhotoDialog = ({
  imageURL,
  onImageURL,
  onOpenChange,
  onSetCroppedArea,
  open,
  title,
  trigger,
  variant,
  ...rest
}: Props) => {
  const handleSetPhoto = (file: File) => {
    onImageURL(URL.createObjectURL(file))
  }

  return (
    <Dialog
      className={s.dialog}
      handleBackBtn={onImageURL}
      onOpenChange={onOpenChange}
      open={open}
      title={title}
      trigger={trigger}
      variant={variant}
    >
      {imageURL ? (
        <CropperPost
          cropShape="rect"
          imageURL={imageURL}
          onSetCroppedArea={onSetCroppedArea}
          setPhoto={handleSetPhoto}
          {...rest}
        />
      ) : (
        <InputPhoto setPhoto={handleSetPhoto} />
      )}
    </Dialog>
  )
}

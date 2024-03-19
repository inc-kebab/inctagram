import { ReactNode } from 'react'

import { Dialog } from '@/shared/ui/Dialog'

import s from './AddPostPhotoDialog.module.scss'

import { CroppedArea } from '../../../profile/model/types/profile.types'
import { InputPhoto } from '../../../profile/ui/InputPhoto/InputPhoto'
import { CropperPost } from '../CropperPost/CropperPost'

type Props = {
  arr?: string[]
  disabled?: boolean
  imageURLArray: string[]
  onImageURL: (imageURLArray: string[]) => void
  onOpenChange?: (open: boolean) => void
  onSetCroppedArea: (croppedArea?: CroppedArea) => void
  open?: boolean
  title?: string
  trigger: ReactNode
  variant?: 'post' | 'profile'
}

export const AddPostPhotoDialog = ({
  imageURLArray,
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
    onImageURL([...imageURLArray, URL.createObjectURL(file)])
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
      {imageURLArray.length > 0 ? (
        /* применить слайдер    imageURL={imageURLArray} */
        <CropperPost
          cropShape="rect"
          imageURL={imageURLArray[0]}
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

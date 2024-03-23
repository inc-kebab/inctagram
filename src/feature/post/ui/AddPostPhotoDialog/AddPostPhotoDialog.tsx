import { ReactNode, useState } from 'react'

import { useAppDispatch } from '@/app/store/store'
import { Dialog } from '@/shared/ui/Dialog'
import clsx from 'clsx'

import s from './AddPostPhotoDialog.module.scss'

import { InputPhoto } from '../../../profile/ui/InputPhoto/InputPhoto'
import { ImageObj, postsActions } from '../../api/post-slice'
import { CropperPost } from '../CropperPost/CropperPost'

export type CurrentWindow = 'description' | 'expand' | 'filter'

type Props = {
  arr?: string[]
  disabled?: boolean
  images: ImageObj[]
  onOpenChange?: (open: boolean) => void
  open?: boolean
  title?: string
  trigger: ReactNode
  variant?: 'post' | 'profile'
}

export const AddPostPhotoDialog = ({
  images,
  onOpenChange,
  open,
  title,
  trigger,
  variant,
  ...rest
}: Props) => {
  const dispatch = useAppDispatch()
  const [currentWindow, setCurrentWindow] = useState<CurrentWindow>('expand')

  const onNextClick = () => {
    if (currentWindow === 'expand') {
      setCurrentWindow('filter')
    } else if (currentWindow === 'filter') {
      setCurrentWindow('description')
    }
  }

  const onBackClick = () => {
    if (currentWindow === 'description') {
      setCurrentWindow('filter')
    } else if (currentWindow === 'filter') {
      setCurrentWindow('expand')
    } else {
      dispatch(postsActions.setImages([]))
    }
  }

  return (
    <Dialog
      className={clsx(s.dialog, currentWindow !== 'expand' && s.extendedDialog)}
      currentWindow={currentWindow}
      onBackClick={onBackClick}
      onNextClick={onNextClick}
      onOpenChange={onOpenChange}
      open={open}
      title={title}
      trigger={trigger}
      variant={variant}
    >
      {images.length > 0 ? (
        <CropperPost currentWindow={currentWindow} images={images} {...rest} />
      ) : (
        <InputPhoto />
      )}
    </Dialog>
  )
}

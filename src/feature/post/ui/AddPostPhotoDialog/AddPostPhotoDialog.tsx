import { ReactNode, useState } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/store/store'
import { getCroppedImg } from '@/feature/profile/model/utils/getCroppedImg'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Dialog } from '@/shared/ui/Dialog'
import clsx from 'clsx'

import s from './AddPostPhotoDialog.module.scss'

import { InputPhoto } from '../../../profile/ui/InputPhoto/InputPhoto'
import { useAddImagesMutation } from '../../api/post-api'
import { postsActions } from '../../api/post-slice'
import { CropperPost } from '../CropperPost/CropperPost'

export type CurrentWindow = 'description' | 'expand' | 'filter'

type Props = {
  disabled?: boolean
  onOpenChange?: (open: boolean) => void
  open?: boolean
  trigger: ReactNode
}

export const AddPostPhotoDialog = ({ onOpenChange, open, trigger, ...rest }: Props) => {
  const images = useAppSelector(state => state.posts.images)
  const dispatch = useAppDispatch()
  const [addImages, { isLoading: isUpdateLoading, isSuccess: isUpdateSuccess }] =
    useAddImagesMutation()
  const { t } = useTranslation()
  const [currentWindow, setCurrentWindow] = useState<CurrentWindow>('expand')

  const handleAddPhoto = async (formData: FormData, i: number) => {
    // console.log('formData', Object.fromEntries(formData), i)
    const response = await addImages(formData)
    // const file = formData.get('files') as Blob | null

    if ('data' in response) {
      console.log('handleAddPhoto uploadId', response.data.images[0].uploadId)
      dispatch(
        postsActions.updateImage({ currentIndex: i, uploadId: response.data.images[0].uploadId })
      )
    }
  }

  const handleSetCroppedArea = () => {
    images.map((image, i) =>
      getCroppedImg({
        crop: image.croppedAreaPixels,
        fileName: 'files',
        imageSrc: image.imageURL,
        t,
      }).then(res => handleAddPhoto(res, i))
    )
  }

  const onNextClick = () => {
    if (currentWindow === 'expand') {
      setCurrentWindow('filter')
    } else if (currentWindow === 'filter') {
      handleSetCroppedArea()
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
      title={images.length === 0 ? t.pages.post.addPhoto : t.pages.post.cropping}
      trigger={trigger}
      variant={images.length === 0 ? 'profile' : 'post'}
    >
      {images.length > 0 ? (
        <CropperPost currentWindow={currentWindow} images={images} {...rest} />
      ) : (
        <InputPhoto />
      )}
    </Dialog>
  )
}

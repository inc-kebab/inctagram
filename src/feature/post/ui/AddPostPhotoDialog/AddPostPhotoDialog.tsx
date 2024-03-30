import { ReactNode, useState } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/store/store'
import { getCroppedImg } from '@/feature/profile/model/utils/getCroppedImg'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Dialog } from '@/shared/ui/Dialog'
import clsx from 'clsx'

import s from './AddPostPhotoDialog.module.scss'

import { InputPhoto } from '../../../profile/ui/InputPhoto/InputPhoto'
import { useAddImagesMutation, useCreatePostMutation } from '../../api/post-api'
import { ImageObjWithFilter, postsActions } from '../../api/post-slice'
import { CropperPost } from '../CropperPost/CropperPost'
import { getFilteredImage } from '../Filters/helpers/imageFilterProcessor'

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
  const [addImages] = useAddImagesMutation()
  const [createPost] = useCreatePostMutation()
  const { t } = useTranslation()
  const [currentWindow, setCurrentWindow] = useState<CurrentWindow>('expand')

  const handleAddPhoto = async (formData: FormData, i: number) => {
    const response = await addImages(formData)

    if ('data' in response) {
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

  const processImages = async (images: ImageObjWithFilter[]) => {
    const promises = images.map(image => getFilteredImage(image.imageURL, image.filter))

    return await Promise.all(promises)
  }

  const publishPost = async (images: ImageObjWithFilter[]) => {
    try {
      const filteredImages = await processImages(images)

      console.log(filteredImages)
    } catch (error) {
      console.error(error)
    }
  }

  const onNextClick = () => {
    if (currentWindow === 'expand') {
      setCurrentWindow('filter')
    } else if (currentWindow === 'filter') {
      handleSetCroppedArea()
      setCurrentWindow('description')
    } else if (currentWindow === 'description') {
      publishPost(images).then(r => {
        dispatch(postsActions.resetImages())
      })

      onOpenChange && onOpenChange(false)
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

  const titles = {
    description: t.pages.post.publication,
    expand: t.pages.post.cropping,
    filter: t.pages.post.filters,
  }

  const title = images.length === 0 ? t.pages.post.addPhoto : titles[currentWindow]

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

import { ReactNode, useState } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/store/store'
import { postsActions } from '@/entities/post'
import { useGetMyProfileQuery } from '@/feature/profile'
import { getCroppedImage } from '@/shared/helpers/getCroppedImage'
import { photoSchema } from '@/shared/helpers/validators/photoSchema'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Dialog } from '@/shared/ui/Dialog'
import { PhotoUploader } from '@/shared/ui/PhotoUploader'
import clsx from 'clsx'

import s from './AddPostPhotoDialog.module.scss'

import { CurrentWindow } from '../../model/types/post.types'
import { CreatePostDialogTitle } from '../CreatePostDialogTitle/CreatePostDialogTitle'
import { CropperPostScreen } from '../CropperPostScreen/CropperPostScreen'
import { DescriptionScreen } from '../DescriptionScreen/DescriptionScreen'
import { FiltersScreen } from '../FiltersScreen/FiltersScreen'

type Props = {
  disabled?: boolean
  onOpenChange?: (open: boolean) => void
  open?: boolean
  trigger: ReactNode
}

export const AddPostPhotoDialog = ({ onOpenChange, open, trigger, ...rest }: Props) => {
  const { t } = useTranslation()

  const [currentWindow, setCurrentWindow] = useState<CurrentWindow>('expand')

  const images = useAppSelector(state => state.posts.images)
  const croppedImages = useAppSelector(state => state.posts.croppedImages)
  const imagesWithFilters = useAppSelector(state => state.posts.imagesWithFilters)

  const dispatch = useAppDispatch()

  const { data } = useGetMyProfileQuery()

  const handleSetPhoto = (file: File) => dispatch(postsActions.addImage(URL.createObjectURL(file)))

  const handleSetCroppedImages = () => {
    const promises = images.map(el => {
      const crop = el.aspect === 0 ? null : el.croppedAreaPixels

      return getCroppedImage({ crop, imageSrc: el.imageURL, mode: 'url', t }) as Promise<string>
    })

    Promise.all(promises).then(images => {
      dispatch(postsActions.setCroppedImages(images))
      setCurrentWindow('filter')
    })
  }

  const handleSetImagesWithFilters = () => {
    const promises = croppedImages.map((el, i) => {
      return getCroppedImage({
        filter: el.filter,
        imageSrc: el.imageURL,
        mode: 'filters',
        t,
      }) as Promise<string>
    })

    Promise.all(promises).then(images => {
      dispatch(postsActions.setImagesWithFilters(images))
      setCurrentWindow('description')
    })
  }

  const titles = {
    description: t.pages.post.publication,
    expand: t.pages.post.cropping,
    filter: t.pages.post.filters,
  }

  const title = images.length === 0 ? t.pages.post.addPhoto : titles[currentWindow]

  const handleClickNext = () => {
    if (currentWindow === 'expand') {
      handleSetCroppedImages()
    } else if (currentWindow === 'filter') {
      handleSetImagesWithFilters()
    }
  }

  const handleClickBack = () => {
    switch (true) {
      case currentWindow === 'description': {
        setCurrentWindow('filter')
        dispatch(postsActions.resetImagesWithFilters())
        break
      }
      case currentWindow === 'filter': {
        setCurrentWindow('expand')
        dispatch(postsActions.resetCroppedImages())
        break
      }
      default: {
        dispatch(postsActions.resetImages())
        break
      }
    }
  }

  const renderWindow = (currentWindow: CurrentWindow) => {
    switch (true) {
      case images.length === 0: {
        return <PhotoUploader setPhoto={handleSetPhoto} zodSchema={photoSchema(t)} />
      }
      case currentWindow === 'expand': {
        return <CropperPostScreen images={images} />
      }
      case currentWindow === 'filter': {
        return <FiltersScreen croppedImages={croppedImages} />
      }
      case currentWindow === 'description': {
        return (
          <DescriptionScreen
            images={imagesWithFilters}
            onCloseModal={() => onOpenChange?.(false)}
            userAvatar={data?.avatars?.['avatar-medium']?.url}
            userName={data?.username}
          />
        )
      }
    }
  }

  return (
    <Dialog
      className={clsx(s.dialog, currentWindow !== 'expand' && s.extendedDialog)}
      customTitleComponent={
        <CreatePostDialogTitle
          currentWindow={currentWindow}
          onBackClick={handleClickBack}
          onNextClick={handleClickNext}
          title={title}
        />
      }
      onOpenChange={onOpenChange}
      open={open}
      trigger={trigger}
    >
      {renderWindow(currentWindow)}
    </Dialog>
  )
}

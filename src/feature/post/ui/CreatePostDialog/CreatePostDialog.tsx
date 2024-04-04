import { ReactNode, useState } from 'react'
import { toast } from 'react-toastify'

import { useAppDispatch, useAppSelector } from '@/app/store/store'
import { ConfirmDialog } from '@/entities/dialog'
import { MAX_SIZE_IMAGE_20MB, postsActions } from '@/entities/post'
import { getModifiedImage } from '@/shared/helpers/getModifiedImage'
import { photoSchema } from '@/shared/helpers/validators/photoSchema'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Button } from '@/shared/ui/Button'
import { Dialog } from '@/shared/ui/Dialog'
import { PhotoUploader } from '@/shared/ui/PhotoUploader'
import clsx from 'clsx'

import s from './CreatePostDialog.module.scss'

import { CurrentWindow } from '../../model/types/post.types'
import { CropperPostScreen } from '../CropperPostScreen/CropperPostScreen'
import { DescriptionScreen } from '../DescriptionScreen/DescriptionScreen'
import { FiltersScreen } from '../FiltersScreen/FiltersScreen'
import { Title } from './Title/Title'

type Props = {
  trigger: ReactNode
}

export const CreatePostDialog = ({ trigger }: Props) => {
  const { t } = useTranslation()

  const [open, setOpen] = useState(false)
  const [openConfirm, setOpenConfirm] = useState(false)

  const [currentWindow, setCurrentWindow] = useState<CurrentWindow>('upload')

  const images = useAppSelector(state => state.posts.images)
  const croppedImages = useAppSelector(state => state.posts.croppedImages)
  const imagesWithFilters = useAppSelector(state => state.posts.imagesWithFilters)

  const dispatch = useAppDispatch()

  const titles: Record<CurrentWindow, string> = {
    description: t.pages.post.publication,
    expand: t.pages.post.cropping,
    filter: t.pages.post.filters,
    upload: t.pages.post.addPhoto,
  }

  const isBigSizeScreen = currentWindow === 'filter' || currentWindow === 'description'

  const isShowUploadScreen = currentWindow === 'upload' && images.length === 0

  const handleSetPhoto = (file: File) => {
    dispatch(postsActions.addImage(URL.createObjectURL(file)))
    setCurrentWindow('expand')
  }

  const handleSetCroppedImages = () => {
    const promises = images.map(el => {
      const crop = el.aspect === 0 ? null : el.croppedAreaPixels

      return getModifiedImage({ crop, imageSrc: el.imageURL, mode: 'url', t }) as Promise<string>
    })

    Promise.all(promises)
      .then(images => {
        dispatch(postsActions.setCroppedImages(images))
        setCurrentWindow('filter')
      })
      .catch(e => toast.error(e.message))
  }

  const handleSetImagesWithFilters = () => {
    const promises = croppedImages.map(el => {
      return getModifiedImage({
        filter: el.filter,
        imageSrc: el.imageURL,
        mode: 'filters',
        t,
      }) as Promise<string>
    })

    Promise.all(promises)
      .then(images => {
        dispatch(postsActions.setImagesWithFilters(images))
        setCurrentWindow('description')
      })
      .catch(e => toast.error(e.message))
  }

  const handleClickNext = () => {
    if (currentWindow === 'expand') {
      handleSetCroppedImages()
    } else if (currentWindow === 'filter') {
      handleSetImagesWithFilters()
    }
  }

  const handleClickBack = () => {
    switch (true) {
      case currentWindow === 'expand': {
        setCurrentWindow('upload')
        dispatch(postsActions.resetImages())
        break
      }
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

  const handleChangeOpen = (open: boolean) => {
    if (!open) {
      currentWindow === 'upload' ? setOpen(false) : setOpenConfirm(true)
    } else {
      setOpen(true)
    }
  }

  const handleCloseModal = () => {
    setOpen(false)
    setCurrentWindow('upload')
    dispatch(postsActions.resetAllImages())
  }

  const handleCloseModals = () => {
    setOpen(false)
    setOpenConfirm(false)
    setCurrentWindow('upload')
    dispatch(postsActions.resetAllImages())
  }

  const handleCloseConfirmModal = () => {
    setOpenConfirm(false)
  }

  const renderWindow = (currentWindow: CurrentWindow) => {
    switch (true) {
      case images.length === 0 && currentWindow === 'upload': {
        return (
          <PhotoUploader
            setPhoto={handleSetPhoto}
            zodSchema={photoSchema(t, MAX_SIZE_IMAGE_20MB)}
          />
        )
      }
      case currentWindow === 'expand': {
        return <CropperPostScreen images={images} onChangeCurrentWindow={setCurrentWindow} />
      }
      case currentWindow === 'filter': {
        return <FiltersScreen croppedImages={croppedImages} />
      }
      case currentWindow === 'description': {
        return <DescriptionScreen images={imagesWithFilters} onCloseModal={handleCloseModal} />
      }
    }
  }

  return (
    <>
      <Dialog
        className={clsx(s.dialog, isBigSizeScreen && s.extendedDialog)}
        customTitleComponent={
          <Title
            onBackClick={handleClickBack}
            onNextClick={handleClickNext}
            showLeftButton={currentWindow !== 'upload'}
            showRightButton={currentWindow !== 'description' && !isShowUploadScreen}
            title={titles[currentWindow]}
          />
        }
        onOpenChange={handleChangeOpen}
        open={open}
        trigger={trigger}
      >
        {renderWindow(currentWindow)}
      </Dialog>
      <ConfirmDialog
        content={t.pages.post.confirmCloseCreateModal.message}
        customActions={
          <div className={s.confirmActions}>
            <Button onClick={handleCloseConfirmModal} variant="outline">
              {t.button.discard}
            </Button>
            <Button onClick={handleCloseModals}>{t.button.saveDraft}</Button>
          </div>
        }
        onOpenChange={setOpenConfirm}
        open={openConfirm}
        title={t.pages.post.confirmCloseCreateModal.title}
      />
    </>
  )
}

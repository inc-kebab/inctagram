import { ReactNode, useState } from 'react'
import { toast } from 'react-toastify'

import { ConfirmDialog } from '@/entities/dialog'
import { MAX_SIZE_IMAGE_20MB, postsActions } from '@/entities/post'
import { CurrentWindow } from '@/feature/post'
import { MobileCropperPostScreen } from '@/feature/post/ui/MobileCropperPostScreen/MobileCropperPostScreen'
import { Close } from '@/shared/assets/icons/common'
import { getModifiedImage, photoSchema } from '@/shared/helpers'
import { useAppDispatch, useAppSelector, useTranslation } from '@/shared/hooks'
import { Button } from '@/shared/ui/Button'
import { Dialog } from '@/shared/ui/Dialog'
import { PhotoUploader } from '@/shared/ui/PhotoUploader'
import { MobileDescriptionScreen } from '@/widgets/post/ui/MobileCreatePostDialog/MobileDescriptionScreen/MobileDescriptionScreen'
import { MobileFiltersScreen } from '@/widgets/post/ui/MobileCreatePostDialog/MobileFiltersScreen/MobileFiltersScreen'
import clsx from 'clsx'

import s from './MobileCreatePostDialog.module.scss'

import { Title } from './Title/Title'

type Props = {
  trigger: ReactNode
}

export const MobileCreatePostDialog = ({ trigger }: Props) => {
  const { t } = useTranslation()

  const [open, setOpen] = useState(false)
  const [openConfirm, setOpenConfirm] = useState(false)

  const [isRequest, setIsRequest] = useState(false)

  const [currentWindow, setCurrentWindow] = useState<CurrentWindow>('upload')

  const images = useAppSelector(state => state.posts.images)
  const croppedImages = useAppSelector(state => state.posts.croppedImages)
  const imagesWithFilters = useAppSelector(state => state.posts.imagesWithFilters)

  const dispatch = useAppDispatch()

  const titles: Record<CurrentWindow, string> = {
    description: t.pages.post.newPublication,
    expand: t.pages.post.newPublication,
    filter: t.pages.post.newPublication,
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
    } else if (currentWindow === 'upload') {
      setOpen(false)
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
      if (currentWindow === 'upload') {
        setOpen(false)
      } else if (!isRequest) {
        setOpenConfirm(true)
      }
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
    setOpenConfirm(false)
    handleCloseModal()
  }

  const handleCloseConfirmModal = () => {
    setOpenConfirm(false)
  }

  const renderWindow = (currentWindow: CurrentWindow) => {
    switch (true) {
      case images.length === 0 && currentWindow === 'upload': {
        return (
          <PhotoUploader
            multiple
            setPhoto={handleSetPhoto}
            zodSchema={photoSchema(t, MAX_SIZE_IMAGE_20MB)}
          />
        )
      }
      case currentWindow === 'expand': {
        return <MobileCropperPostScreen images={images} onChangeCurrentWindow={setCurrentWindow} />
      }
      case currentWindow === 'filter': {
        return <MobileFiltersScreen croppedImages={croppedImages} />
      }
      case currentWindow === 'description': {
        return (
          <MobileDescriptionScreen
            images={imagesWithFilters}
            onChangeStatus={setIsRequest}
            onCloseModal={handleCloseModal}
          />
        )
      }
    }
  }

  const buttonTexts = {
    description: t.button.publish,
    expand: t.button.next,
    filter: t.button.done,
    upload: <Close className={s.close} />,
  }

  return (
    <>
      <Dialog
        className={clsx(
          s.dialog,
          isBigSizeScreen && s.extendedDialog,
          currentWindow === 'upload' && s.uploadDialog
        )}
        customTitleComponent={
          <Title
            buttonTextRight={buttonTexts[currentWindow]}
            className={currentWindow === 'upload' ? s.title : ''}
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

import { ReactNode, useState } from 'react'

import { ConfirmDialog } from '@/entities/dialog'
import { postsActions } from '@/entities/post'
import {
  CropperPostScreen,
  CurrentWindow,
  DescriptionScreen,
  FiltersScreen,
  UploadImagesScreen,
} from '@/feature/post'
import { useAppDispatch, useTranslation } from '@/shared/hooks'
import { Button } from '@/shared/ui/Button'
import { Dialog } from '@/shared/ui/Dialog'
import clsx from 'clsx'

import s from './CreatePostDialog.module.scss'

type Props = {
  trigger: ReactNode
}

export const CreatePostDialog = ({ trigger }: Props) => {
  const { t } = useTranslation()

  const dispatch = useAppDispatch()

  const [open, setOpen] = useState(false)
  const [openConfirm, setOpenConfirm] = useState(false)

  const [isRequest, setIsRequest] = useState(false)

  const [window, setWindow] = useState<CurrentWindow>('upload')

  const isBigSizeScreen = window === 'filter' || window === 'description'

  const handleChangeOpen = (open: boolean) => {
    if (!open) {
      if (window === 'upload') {
        setOpen(false)
      } else if (!isRequest) {
        setOpenConfirm(true)
      }
    } else {
      setOpen(true)
    }
  }

  const handleCloseModals = () => {
    setOpenConfirm(false)
    setOpen(false)
    setWindow('upload')
    dispatch(postsActions.resetAllImages())
  }

  const handleCloseConfirmModal = () => {
    setOpenConfirm(false)
  }

  const renderWindow = (currentWindow: CurrentWindow) => {
    switch (true) {
      case currentWindow === 'upload': {
        return <UploadImagesScreen onChangeWindow={setWindow} />
      }
      case currentWindow === 'expand': {
        return <CropperPostScreen onChangeWindow={setWindow} />
      }
      case currentWindow === 'filter': {
        return <FiltersScreen onChangeWindow={setWindow} />
      }
      case currentWindow === 'description': {
        return (
          <DescriptionScreen
            onChangeStatus={setIsRequest}
            onChangeWindow={setWindow}
            onCloseModal={handleCloseModals}
          />
        )
      }
    }
  }

  return (
    <>
      <Dialog
        className={clsx(
          s.dialog,
          isBigSizeScreen && s.extendedDialog,
          window === 'upload' ? s.dialogUpload : s.dialogMobile
        )}
        onOpenChange={handleChangeOpen}
        open={open}
        trigger={trigger}
      >
        {renderWindow(window)}
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

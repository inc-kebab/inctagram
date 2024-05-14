import { ReactNode, useState } from 'react'

import { ConfirmDialog } from '@/entities/dialog'
import { CurrentWindow, deleteDB, postsActions } from '@/entities/post'
import {
  CropperPostScreen,
  DescriptionScreen,
  FiltersScreen,
  UploadImagesScreen,
} from '@/feature/post'
import { useAppDispatch, useAppSelector, useTranslation } from '@/shared/hooks'
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

  const window = useAppSelector(state => state.posts.window)

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

  const handleSaveDraft = () => {
    setOpenConfirm(false)
    setOpen(false)
    dispatch(postsActions.setWindow('upload'))
    dispatch(postsActions.resetAllImages())
  }

  const handleDiscard = () => {
    void deleteDB()
    handleSaveDraft()
  }

  const renderWindow = (currentWindow: CurrentWindow) => {
    switch (true) {
      case currentWindow === 'upload': {
        return <UploadImagesScreen />
      }
      case currentWindow === 'expand': {
        return <CropperPostScreen />
      }
      case currentWindow === 'filter': {
        return <FiltersScreen />
      }
      case currentWindow === 'description': {
        return <DescriptionScreen onChangeStatus={setIsRequest} onCloseModal={handleSaveDraft} />
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
            <Button onClick={handleDiscard} variant="outline">
              {t.button.discard}
            </Button>
            <Button onClick={handleSaveDraft}>{t.button.saveDraft}</Button>
          </div>
        }
        onOpenChange={setOpenConfirm}
        open={openConfirm}
        title={t.pages.post.confirmCloseCreateModal.title}
      />
    </>
  )
}

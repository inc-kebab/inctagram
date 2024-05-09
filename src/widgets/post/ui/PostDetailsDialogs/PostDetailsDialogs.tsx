import { useState } from 'react'

import { ConfirmDialog } from '@/entities/dialog'
import { PostItem } from '@/entities/post'
import { UserBanner } from '@/entities/user'
import { EditPostForm, PostDetails, useDeletePost, useEditPost } from '@/feature/post'
import { Close } from '@/shared/assets/icons/common'
import { useTranslation } from '@/shared/hooks'
import { Carousel } from '@/shared/ui/Carousel'
import { Dialog } from '@/shared/ui/Dialog'
import { DialogClose } from '@/shared/ui/Dialog/DialogClose'
import { useRouter } from 'next/router'

import s from './PostDetailsDialogs.module.scss'

import { EditPostDialogTitle } from './EditPostDialogTitle/EditPostDialogTitle'

interface Props {
  currentPost: Nullable<PostItem>
  isAuth: boolean
  isOwner?: boolean
  onOpenChange: (open: boolean) => void
  open: boolean
  setCurrentPost: (post: Nullable<PostItem>) => void
}

export const PostDetailsDialogs = ({
  currentPost,
  isAuth,
  isOwner,
  onOpenChange,
  open,
  setCurrentPost,
}: Props) => {
  const { t } = useTranslation()
  const { query, replace } = useRouter()

  const [editMode, setEditMode] = useState(false)
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false)
  const [openConfirmEdit, setOpenConfirmEdit] = useState(false)

  const handleDeactivateEditMode = () => setEditMode(false)

  const handleActivateEditMode = () => setEditMode(true)

  const handleChangeOpen = (open: boolean) => {
    if (editMode) {
      editPostRef.current?.isDirty ? setOpenConfirmEdit(true) : setEditMode(open)
    } else {
      onOpenChange(open)
    }
  }

  const handleClose = () => {
    onOpenChange(false)
    openConfirmDelete && setOpenConfirmDelete(false)

    void replace(query.id ? { query: { id: query.id } } : {}, undefined, {
      shallow: true,
    })
  }

  const handleCancelEditPost = () => {
    setOpenConfirmEdit(false)
    setEditMode(false)
  }

  const { editPostRef, handleSubmitEditPost, isEditLoad } = useEditPost(
    currentPost!,
    handleDeactivateEditMode,
    setCurrentPost
  )

  const { handleDeletePost, isDeletePostLoad } = useDeletePost(
    currentPost!,
    handleClose,
    setCurrentPost
  )

  return (
    <>
      <Dialog
        className={s.dialog}
        classNameOverlay={s.overlay}
        customTitleComponent={editMode ? <EditPostDialogTitle /> : undefined}
        onOpenChange={handleChangeOpen}
        open={open}
      >
        {editMode ? (
          <div className={s.editDialog}>
            <Carousel className={s.editSlider} imagesUrl={currentPost?.images} />
            <div className={s.editContent}>
              <UserBanner avatar={currentPost?.avatarOwner} name={currentPost?.username || ''} />
              <EditPostForm
                className={s.editForm}
                classNameSubmit={s.editSubmit}
                currentDescription={currentPost?.description}
                disabled={isEditLoad}
                onSubmit={handleSubmitEditPost}
                ref={editPostRef}
                titleSubmit={t.pages.post.save}
              />
            </div>
          </div>
        ) : (
          <>
            <DialogClose className={s.dialogClose}>
              <Close className={s.closeIcon} />
            </DialogClose>
            <PostDetails
              isAuth={isAuth}
              isOwner={isOwner}
              item={currentPost}
              onOpenConfirmDeleteModal={() => setOpenConfirmDelete(true)}
              onOpenEditModal={handleActivateEditMode}
            />
          </>
        )}
      </Dialog>
      <ConfirmDialog
        confirmCallback={handleCancelEditPost}
        content={t.pages.post.editInfoModal.message}
        disabled={isEditLoad}
        onOpenChange={setOpenConfirmEdit}
        open={openConfirmEdit}
        title={t.pages.post.editInfoModal.title}
      />
      <ConfirmDialog
        confirmCallback={handleDeletePost}
        content={t.pages.post.deletePostQuestion}
        disabled={isDeletePostLoad}
        onOpenChange={setOpenConfirmDelete}
        open={openConfirmDelete}
        title={t.pages.post.deletePost}
      />
    </>
  )
}

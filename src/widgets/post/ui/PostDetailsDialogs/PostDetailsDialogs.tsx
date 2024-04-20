import { useState } from 'react'

import { ConfirmDialog } from '@/entities/dialog'
import { PostItem } from '@/entities/post'
import { PostDetails, useDeletePostMutation, useEditPost } from '@/feature/post'
import { Close } from '@/shared/assets/icons/common'
import { handleErrorResponse } from '@/shared/helpers'
import { useTranslation } from '@/shared/hooks'
import { Dialog } from '@/shared/ui/Dialog'
import { DialogClose } from '@/shared/ui/Dialog/DialogClose'
import { EditPostDialog } from '@/widgets/post/ui/EditPostDialog/EditPostDialog'
import { useRouter } from 'next/router'

import s from './PostDetailsDialogs.module.scss'

interface Props {
  currentPost: Nullable<PostItem>
  isOwner: boolean
  openPostDetailsModal: boolean
  setCurrentPost: (post: Nullable<PostItem>) => void
  setOpenPostDetailsModal: (open: boolean) => void
}

export const PostDetailsDialogs = ({
  currentPost,
  isOwner,
  openPostDetailsModal,
  setCurrentPost,
  setOpenPostDetailsModal,
}: Props) => {
  const { t } = useTranslation()
  const { query, replace } = useRouter()

  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [openConfirmCloseEditModal, setOpenConfirmCloseEditModal] = useState(false)

  const handleCloseEditModal = () => setOpenEditModal(false)

  const handleClosePostDetailsModal = () => {
    void replace(query.id ? { query: { id: query.id } } : {}, undefined, {
      shallow: true,
    })
  }

  const handleCloseEditModalWithConfirm = () => {
    setOpenConfirmCloseEditModal(false)
    setOpenEditModal(false)
  }

  const { editPostRef, handleSubmitEditPost, isEditLoad } = useEditPost(
    currentPost!,
    handleCloseEditModal,
    setCurrentPost
  )

  const [deletePost, { isLoading: isDeletePostLoad }] = useDeletePostMutation()

  const handleDeletePost = () => {
    currentPost &&
      deletePost({ id: currentPost.id }).then(res => {
        if ('error' in res) {
          handleErrorResponse(res.error)
        } else {
          setOpenPostDetailsModal(false)
          handleClosePostDetailsModal()
          setOpenConfirmDeleteModal(false)
          setCurrentPost(null)
        }
      })
  }

  const handleChangeOpenEditModal = (open: boolean) => {
    if (!open) {
      editPostRef.current?.isDirty ? setOpenConfirmCloseEditModal(true) : setOpenEditModal(false)
    } else {
      setOpenEditModal(true)
    }
  }

  const handlerChangeOpenPostDetailsModal = (open: boolean) => {
    if (!open) {
      handleClosePostDetailsModal()
    }
    setOpenPostDetailsModal(open)
  }

  return (
    <>
      <Dialog
        className={s.dialog}
        onOpenChange={handlerChangeOpenPostDetailsModal}
        open={openPostDetailsModal}
      >
        <DialogClose className={s.dialogClose}>
          <Close className={s.closeIcon} />
        </DialogClose>
        <PostDetails
          isOwner={isOwner}
          item={currentPost}
          onOpenConfirmDeleteModal={() => setOpenConfirmDeleteModal(true)}
          onOpenEditModal={() => setOpenEditModal(true)}
        />
      </Dialog>

      <EditPostDialog
        currentPost={currentPost}
        editPostRef={editPostRef}
        handleChangeOpenEditModal={handleChangeOpenEditModal}
        handleSubmitEditPost={handleSubmitEditPost}
        isEditLoad={isEditLoad}
        openEditModal={openEditModal}
      />

      <ConfirmDialog
        confirmCallback={handleCloseEditModalWithConfirm}
        content={t.pages.post.editInfoModal.message}
        disabled={isEditLoad}
        onOpenChange={setOpenConfirmCloseEditModal}
        open={openConfirmCloseEditModal}
        title={t.pages.post.editInfoModal.title}
      />
      <ConfirmDialog
        confirmCallback={handleDeletePost}
        content={t.pages.post.deletePostQuestion}
        disabled={isDeletePostLoad}
        onOpenChange={setOpenConfirmDeleteModal}
        open={openConfirmDeleteModal}
        title={t.pages.post.deletePost}
      />
    </>
  )
}

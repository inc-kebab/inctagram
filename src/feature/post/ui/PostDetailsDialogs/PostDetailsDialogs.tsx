import { useState } from 'react'

import { ConfirmDialog } from '@/entities/dialog'
import { PostItem, UserBanner } from '@/entities/post'
import { Close } from '@/shared/assets/icons/common'
import { handleErrorResponse } from '@/shared/helpers/handleErrorResponse'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Carousel } from '@/shared/ui/Carousel'
import { Dialog } from '@/shared/ui/Dialog'
import { DialogClose } from '@/shared/ui/Dialog/DialogClose'

import s from './PostDetailsDialogs.module.scss'

import { useDeletePostMutation } from '../../api/post-api'
import { useEditPost } from '../../model/hooks/useEditPost'
import { EditPostForm } from '../EditPostForm/EditPostForm'
import { PostDetails } from '../PostDetails/PostDetails'

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

  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false)

  const [openEditModal, setOpenEditModal] = useState(false)
  const [openConfirmCloseEditModal, setOpenConfirmCloseEditModal] = useState(false)

  const handleCloseEditModal = () => setOpenEditModal(false)

  const { editPostRef, handleSubmitEditPost, isEditLoad } = useEditPost(
    currentPost!,
    handleCloseEditModal,
    setCurrentPost
  )

  const [deletePost, { isLoading: isDeletePostLoad }] = useDeletePostMutation()

  const handleChangeOpenEditModal = (open: boolean) => {
    if (!open) {
      editPostRef.current?.isDirty ? setOpenConfirmCloseEditModal(true) : setOpenEditModal(false)
    } else {
      setOpenEditModal(true)
    }
  }

  const handleCloseEditModalWithConfirm = () => {
    setOpenConfirmCloseEditModal(false)
    setOpenEditModal(false)
  }

  const handleDeletePost = () => {
    currentPost &&
      deletePost({ id: currentPost.id }).then(res => {
        if ('error' in res) {
          handleErrorResponse(res.error)
        } else {
          setOpenPostDetailsModal(false)
          setOpenConfirmDeleteModal(false)
          setCurrentPost(null)
        }
      })
  }

  return (
    <>
      <Dialog
        className={s.dialog}
        onOpenChange={setOpenPostDetailsModal}
        open={openPostDetailsModal}
      >
        <DialogClose>
          <Close className={s.closeIcon} />
        </DialogClose>
        <PostDetails
          isOwner={isOwner}
          item={currentPost}
          onOpenConfirmDeleteModal={() => setOpenConfirmDeleteModal(true)}
          onOpenEditModal={() => setOpenEditModal(true)}
        />
      </Dialog>
      <Dialog
        className={s.dialog}
        onOpenChange={handleChangeOpenEditModal}
        open={openEditModal}
        title={t.pages.post.editPost}
      >
        <div className={s.editDialog}>
          <Carousel className={s.slider} imagesUrl={currentPost?.images} />
          <UserBanner
            avatar={currentPost?.avatarOwner}
            className={s.header}
            name={currentPost?.username || ''}
          />
          <EditPostForm
            currentDescription={currentPost?.description}
            disabled={isEditLoad}
            onSubmit={handleSubmitEditPost}
            ref={editPostRef}
            style={{ height: '100%' }}
          />
        </div>
      </Dialog>
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

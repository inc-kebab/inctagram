import { useState } from 'react'

import { ProfileInfo } from '@/entities/profile'
import { EditPostForm, useEditPost } from '@/feature/post'
import { useGetMyProfileQuery } from '@/feature/profile'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Page } from '@/shared/types/layout'
import { Button } from '@/shared/ui/Button'
import { Dialog } from '@/shared/ui/Dialog'
import { Loader } from '@/shared/ui/Loader'
import { Typography } from '@/shared/ui/Typography'
import { ConfirmDialog } from '@/widgets/dialogs'
import { SidebarLayout } from '@/widgets/layout'

import s from './Profile.module.scss'

const Profile: Page = () => {
  const { t } = useTranslation()

  const [open, setOpen] = useState(false)

  const { confirmModal, editPostRef, handleSubmitEditPost, isEditLoad } = useEditPost()

  const { data, isLoading } = useGetMyProfileQuery()

  const handleClosePostModal = () => {
    setOpen(false)
    confirmModal.setOpen(false)
  }

  const handleChangeOpenPostModal = (open: boolean) => {
    if (!open) {
      editPostRef.current?.isDirty ? confirmModal.setOpen(true) : setOpen(false)
    } else {
      setOpen(true)
    }
  }

  if (isLoading) {
    return <Loader containerHeight />
  }

  return (
    <>
      <ProfileInfo
        className={s.info}
        userData={{
          aboutMe: data?.aboutMe,
          avatar: data?.avatars?.['avatar-medium']?.url,
          username: data?.username,
        }}
      />
      <Dialog
        onOpenChange={handleChangeOpenPostModal}
        open={open}
        title="Edit Post"
        trigger={<Button asComponent="span">Click</Button>}
      >
        <EditPostForm disabled={isEditLoad} onSubmit={handleSubmitEditPost} ref={editPostRef} />
      </Dialog>
      <ConfirmDialog
        confirmCallback={handleClosePostModal}
        content={<Typography>{t.pages.post.editInfoModal.message}</Typography>}
        onOpenChange={confirmModal.setOpen}
        open={confirmModal.open}
        title={t.pages.post.editInfoModal.title}
      />
    </>
  )
}

Profile.getLayout = (page, t) => {
  return (
    <SidebarLayout description={t.pages.profile.metaDescription} title={t.pages.profile.metaTitle}>
      {page}
    </SidebarLayout>
  )
}

export default Profile

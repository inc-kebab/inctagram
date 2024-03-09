import { ReactElement, useState } from 'react'

import {
  AddProfilePhoto,
  AddProfilePhotoDialog,
  DeletePhotoDialog,
  useAddAvatarMutation,
  useRemoveAvatarMutation,
} from '@/feature/profile'
import { handleErrorResponse } from '@/shared/helpers/handleErrorResponse'
import { Page } from '@/shared/types/layout'
import { SidebarLayout } from '@/widgets/layout'

const Profile: Page = () => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [openAddDialog, setOpenAddDialog] = useState(false)

  const [removeAvatar, { isSuccess: isRemoveSuccess }] = useRemoveAvatarMutation()
  const [addAvatar, { isLoading, isSuccess: isAddSuccess }] = useAddAvatarMutation()

  const handleOpenAdd = () => setOpenAddDialog(true)
  const handleOpenDelete = () => setOpenDeleteDialog(true)

  const handleRemove = () => {
    removeAvatar().then(res => {
      if ('data' in res) {
        setOpenDeleteDialog(false)
      }
      if ('error' in res) {
        handleErrorResponse(res.error)
      }
    })
  }

  return (
    <div>
      <AddProfilePhoto onOpenAddDialog={handleOpenAdd} onOpenDeleteDialog={handleOpenDelete} />
      <DeletePhotoDialog
        confirmCallback={handleRemove}
        disabled={isRemoveSuccess}
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
      />
      <AddProfilePhotoDialog
        addAvatar={addAvatar}
        disabled={isLoading}
        isSuccess={isAddSuccess}
        onOpenChange={setOpenAddDialog}
        open={openAddDialog}
      />
    </div>
  )
}

Profile.getLayout = (page: ReactElement) => {
  return <SidebarLayout>{page}</SidebarLayout>
}

export default Profile

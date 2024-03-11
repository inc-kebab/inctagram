import { ReactElement, useState } from 'react'

import {
  AddProfilePhoto,
  AddProfilePhotoDialog,
  DeletePhotoDialog,
  useAddAvatarMutation,
  useGetAvatarQuery,
  useRemoveAvatarMutation,
} from '@/feature/profile'
import { getCroppedImg } from '@/feature/profile/model/utils/getCroppedImg'
import { handleErrorResponse } from '@/shared/helpers/handleErrorResponse'
import { Page } from '@/shared/types/layout'
import { SidebarLayout } from '@/widgets/layout'

const Profile: Page = () => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [openAddDialog, setOpenAddDialog] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState('')

  const [removeAvatar, { isLoading: isRemoveLoad, isSuccess: isRemoveSuccess }] =
    useRemoveAvatarMutation()
  const [addAvatar, { isLoading, isSuccess: isAddSuccess }] = useAddAvatarMutation()
  const { data: profile } = useGetAvatarQuery()
  const avaUrlFromServer = profile?.avatars?.avatar.url
  const handleOpenAdd = () => {
    setOpenAddDialog(prev => !prev)
  }
  const handleOpenDelete = () => setOpenDeleteDialog(prev => !prev)

  const handleRemove = () => {
    setOpenDeleteDialog(prev => !prev)
    removeAvatar().then(res => {
      if ('error' in res) {
        setOpenDeleteDialog(prev => !prev)
        handleErrorResponse(res.error)
      }
    })
  }

  const addAvatarHandler = (croppedAreaPixels: {
    height: number
    width: number
    x: number
    y: number
  }) => {
    if (croppedAreaPixels) {
      getCroppedImg({ crop: croppedAreaPixels, fileName: 'file', imageSrc: avatarUrl }).then(
        res => {
          addAvatar(res as FormData).then(response => {
            if ('error' in response) {
              handleErrorResponse(response.error)
            }
          })
        }
      )
    }
  }

  const openChangeHandler = () => {
    setOpenAddDialog(prev => !prev)
    setAvatarUrl('')
  }

  return (
    <div>
      <AddProfilePhoto
        avaUrlFromServer={avaUrlFromServer}
        onOpenAddDialog={handleOpenAdd}
        onOpenDeleteDialog={handleOpenDelete}
      />
      <DeletePhotoDialog
        confirmCallback={handleRemove}
        disabled={isRemoveLoad}
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
      />
      <AddProfilePhotoDialog
        addAvatarHandler={addAvatarHandler}
        avatarUrl={avatarUrl}
        disabled={isLoading}
        isSuccess={isAddSuccess}
        onAvatarUrl={setAvatarUrl}
        onOpenChange={openChangeHandler}
        open={openAddDialog}
      />
    </div>
  )
}

Profile.getLayout = (page: ReactElement) => {
  return <SidebarLayout>{page}</SidebarLayout>
}

export default Profile

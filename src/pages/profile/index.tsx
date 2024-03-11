import { ReactElement, useState } from 'react'

import {
  AddProfilePhoto,
  AddProfilePhotoDialog,
  CroppedArea,
  getCroppedImg,
  useAddAvatarMutation,
  useGetMyProfileQuery,
  useRemoveAvatarMutation,
} from '@/feature/profile'
import { handleErrorResponse } from '@/shared/helpers/handleErrorResponse'
import { Page } from '@/shared/types/layout'
import { SidebarLayout } from '@/widgets/layout'

const Profile: Page = () => {
  const [openAddDialog, setOpenAddDialog] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState('')

  const { data: profile } = useGetMyProfileQuery()

  const [removeAvatar, { isLoading: isRemoveLoad }] = useRemoveAvatarMutation()
  const [addAvatar, { isLoading }] = useAddAvatarMutation()

  const handleOpenAdd = () => setOpenAddDialog(prev => !prev)

  const handleRemove = () => {
    removeAvatar().then(res => {
      if ('error' in res) {
        handleErrorResponse(res.error)
      }
    })
  }

  const handleChangeAvatar = (croppedAreaPixels: CroppedArea) => {
    if (croppedAreaPixels) {
      getCroppedImg({ crop: croppedAreaPixels, fileName: 'file', imageSrc: avatarUrl }).then(
        res => {
          addAvatar(res).then(response => {
            if ('error' in response) {
              handleErrorResponse(response.error)
            }
          })
        }
      )
    }
  }

  const handleChangeOpen = (open: boolean) => {
    setOpenAddDialog(open)
    setAvatarUrl('')
  }

  return (
    <div>
      <AddProfilePhoto
        avaUrlFromServer={profile?.avatars?.avatar?.url}
        disabled={isRemoveLoad}
        onDeletePhoto={handleRemove}
        onOpenAddDialog={handleOpenAdd}
      />
      <AddProfilePhotoDialog
        avatarUrl={avatarUrl}
        disabled={isLoading}
        onAvatarUrl={setAvatarUrl}
        onOpenChange={handleChangeOpen}
        onSetCroppedArea={handleChangeAvatar}
        open={openAddDialog}
      />
    </div>
  )
}

Profile.getLayout = (page: ReactElement) => {
  return <SidebarLayout>{page}</SidebarLayout>
}

export default Profile

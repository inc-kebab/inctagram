import { ReactElement, useState } from 'react'

import { AddProfilePhoto, DeletePhotoDialog, useRemoveAvatarMutation } from '@/feature/profile'
import { handleErrorResponse } from '@/shared/helpers/handleErrorResponse'
import { Page } from '@/shared/types/layout'
import { SidebarLayout } from '@/widgets/layout'

const Profile: Page = () => {
  const [open, setOpen] = useState(false)

  const [removeAvatar, { isSuccess }] = useRemoveAvatarMutation()

  const handleRemove = () => {
    removeAvatar().then(res => {
      if ('data' in res) {
        setOpen(false)
      }
      if ('error' in res) {
        handleErrorResponse(res.error)
      }
    })
  }

  return (
    <div>
      <AddProfilePhoto setOpen={setOpen} />
      <DeletePhotoDialog
        confirmCallback={handleRemove}
        disabled={isSuccess}
        open={open}
        setOpen={setOpen}
      />
    </div>
  )
}

Profile.getLayout = (page: ReactElement) => {
  return <SidebarLayout>{page}</SidebarLayout>
}

export default Profile

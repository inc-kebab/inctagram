import { ReactElement } from 'react'

import { EditProfileForm } from '@/feature/profile'
import { useGetMyProfileQuery, useUpdateProfileMutation } from '@/feature/profile/api/profile-api'
import { EditProfileFormValues } from '@/feature/profile/model/utils/validators/editProfileSchema'
import { Page } from '@/shared/types/layout'
import { SidebarLayout } from '@/widgets/layout'
import { format } from 'date-fns'

import s from './ProfileSettings.module.scss'

const ProfileSettings: Page = () => {
  const { data } = useGetMyProfileQuery()
  const [updateProfile] = useUpdateProfileMutation()

  console.log('data', data)

  return (
    <div className={s.root}>
      <EditProfileForm
        onSubmit={(data: EditProfileFormValues) => {
          updateProfile({
            ...data,
            birthDate: format(data.birthDate, 'dd-MM-yyyy'),
          })
        }}
      />
    </div>
  )
}

ProfileSettings.getLayout = (page: ReactElement) => {
  return <SidebarLayout>{page}</SidebarLayout>
}

export default ProfileSettings

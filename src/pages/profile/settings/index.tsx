import { ReactElement } from 'react'

import { EditProfileForm } from '@/feature/profile'
import { EditProfileFormValues } from '@/feature/profile/model/utils/validators/editProfileSchema'
import { Page } from '@/shared/types/layout'
import { SidebarLayout } from '@/widgets/layout'

import s from './ProfileSettings.module.scss'

const ProfileSettings: Page = () => {
  return (
    <div className={s.root}>
      <EditProfileForm onSubmit={(data: EditProfileFormValues) => {}} />
    </div>
  )
}

ProfileSettings.getLayout = (page: ReactElement) => {
  return <SidebarLayout>{page}</SidebarLayout>
}

export default ProfileSettings

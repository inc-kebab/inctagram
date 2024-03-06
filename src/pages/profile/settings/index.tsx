import { ReactElement } from 'react'

import { EditProfileForm } from '@/feature/profile'
import { Page } from '@/shared/types/layout'
import { SidebarLayout } from '@/widgets/layout'

import s from './ProfileSettings.module.scss'

const ProfileSettings: Page = () => {
  return (
    <div className={s.root}>
      <EditProfileForm
        onSubmit={(data: any) => {
          console.log(data)
        }}
      />
    </div>
  )
}

ProfileSettings.getLayout = (page: ReactElement) => {
  return <SidebarLayout>{page}</SidebarLayout>
}

export default ProfileSettings

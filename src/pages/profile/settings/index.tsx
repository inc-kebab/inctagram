import { ReactElement } from 'react'

import GeneralInformation from '@/feature/profile/ui/GeneralInformation/GeneralInformation'
import { Page } from '@/shared/types/layout'
import { SidebarLayout } from '@/widgets/layout'

import s from './ProfileSettings.module.scss'

const ProfileSettings: Page = () => {
  return (
    <div className={s.root}>
      <GeneralInformation />
    </div>
  )
}

ProfileSettings.getLayout = (page: ReactElement) => {
  return <SidebarLayout>{page}</SidebarLayout>
}

export default ProfileSettings

import { ReactElement } from 'react'

import ProfileSettings from '@/pages/profile/settings'
import { Page } from '@/shared/types/layout'
import { SidebarLayout } from '@/widgets/layout'

const Profile: Page = () => {
  return <ProfileSettings />
}

Profile.getLayout = (page: ReactElement) => {
  return <SidebarLayout>{page}</SidebarLayout>
}

export default Profile

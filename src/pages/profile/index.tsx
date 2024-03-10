import { ReactElement } from 'react'

import GeneralInformation from '@/feature/profile/ui/GeneralInformation/GeneralInformation'
import { Page } from '@/shared/types/layout'
import { SidebarLayout } from '@/widgets/layout'

const Profile: Page = () => {
  return <GeneralInformation />
}

Profile.getLayout = (page: ReactElement) => {
  return <SidebarLayout>{page}</SidebarLayout>
}

export default Profile

import { ReactElement } from 'react'

import { Page } from '@/shared/types/layout'
import { SidebarLayout } from '@/widgets/layout'

const Profile: Page = () => {
  return <div>Profile page</div>
}

Profile.getLayout = (page: ReactElement) => {
  return <SidebarLayout>{page}</SidebarLayout>
}

export default Profile

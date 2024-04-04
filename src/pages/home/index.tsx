import { ReactElement } from 'react'

import { DefenderProtectedRoute } from '@/shared/helpers/hoc/DefenderProtectedRoute'
import { Page } from '@/shared/types/layout'
import { SidebarLayout } from '@/widgets/layout'

const Home: Page = () => {
  return <div>Home Page</div>
}

Home.getLayout = (page: ReactElement) => {
  return <SidebarLayout>{page}</SidebarLayout>
}

export default DefenderProtectedRoute(Home)

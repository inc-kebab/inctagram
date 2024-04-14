import { ReactElement } from 'react'

import { DefenderProtectedRoute } from '@/shared/helpers'
import { Page } from '@/shared/types/layout'
import { SidebarLayout } from '@/widgets/layout'

const Statistics: Page = () => {
  return <div>Statistics page</div>
}

Statistics.getLayout = (page: ReactElement) => {
  return <SidebarLayout>{page}</SidebarLayout>
}

export default DefenderProtectedRoute(Statistics)

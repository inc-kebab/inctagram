import { ReactElement } from 'react'

import { DefenderProtectedRoute } from '@/shared/helpers/hoc/DefenderProtectedRoute'
import { Page } from '@/shared/types/layout'
import { SidebarLayout } from '@/widgets/layout'

const Messenger: Page = () => {
  return <div>Messenger page</div>
}

Messenger.getLayout = (page: ReactElement) => {
  return <SidebarLayout>{page}</SidebarLayout>
}

export default DefenderProtectedRoute(Messenger)

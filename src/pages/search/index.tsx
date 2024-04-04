import { ReactElement } from 'react'

import { DefenderProtectedRoute } from '@/shared/helpers/hoc/DefenderProtectedRoute'
import { Page } from '@/shared/types/layout'
import { SidebarLayout } from '@/widgets/layout'

const Search: Page = () => {
  return <div>Search page</div>
}

Search.getLayout = (page: ReactElement) => {
  return <SidebarLayout>{page}</SidebarLayout>
}

export default DefenderProtectedRoute(Search)

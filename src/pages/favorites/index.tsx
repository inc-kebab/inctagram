import { ReactElement } from 'react'

import { DefenderProtectedRoute } from '@/shared/helpers/hoc/DefenderProtectedRoute'
import { Page } from '@/shared/types/layout'
import { SidebarLayout } from '@/widgets/layout'

const Favorites: Page = () => {
  return <div>Favorites page</div>
}

Favorites.getLayout = (page: ReactElement) => {
  return <SidebarLayout>{page}</SidebarLayout>
}

export default DefenderProtectedRoute(Favorites)

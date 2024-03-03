import { PropsWithChildren } from 'react'

import { useLogoutMutation } from '@/feature/auth'
import { AppRoutes } from '@/shared/const/routes'
import { handleErrorResponse } from '@/shared/helpers/handleErrorResponse'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Header } from '@/widgets/header'
import { getSidebarItems } from '@/widgets/sidebar/model/utils/getSidebarItems'
import { Sidebar } from '@/widgets/sidebar/ui/Sidebar/Sidebar'
import { useRouter } from 'next/router'

import s from './SidebarLayout.module.scss'

export const SidebarLayout = ({ children }: PropsWithChildren) => {
  const { push } = useRouter()

  const [logout, { isLoading }] = useLogoutMutation()

  const { t } = useTranslation()

  const handleLogout = () => {
    logout().then(res => {
      if ('data' in res) {
        void push(AppRoutes.MAIN)
      }
      if ('error' in res) {
        handleErrorResponse(res.error)
      }
    })
  }

  return (
    <>
      <Header />
      <div className={s.wrapper}>
        <Sidebar
          buttonName={t.layout.sidebar.logout}
          isLoading={isLoading}
          items={getSidebarItems(t)}
          onLogout={handleLogout}
        />
        <main className={s.main}>{children}</main>
      </div>
    </>
  )
}

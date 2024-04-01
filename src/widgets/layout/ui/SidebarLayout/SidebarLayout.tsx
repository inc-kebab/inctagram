import { PropsWithChildren } from 'react'

import { useLogoutMutation } from '@/feature/auth'
import { AppRoutes } from '@/shared/const/routes'
import { handleErrorResponse } from '@/shared/helpers/handleErrorResponse'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Meta, MetaProps } from '@/shared/seo/Meta'
import clsx from 'clsx'
import { useRouter } from 'next/router'

import s from './SidebarLayout.module.scss'

import { getSidebarItems } from '../../model/utils/getSidebarItems'
import { Header } from '../Header/Header'
import { Sidebar } from '../Sidebar/Sidebar'

type Props = PropsWithChildren & Omit<MetaProps, 'children'>

export const SidebarLayout = ({ children, ...rest }: Props) => {
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
    <Meta {...rest}>
      <Header />
      <div className={clsx('main_container', s.wrapper)}>
        <Sidebar
          buttonName={t.layout.sidebar.logout}
          isLoading={isLoading}
          items={getSidebarItems(t)}
          onLogout={handleLogout}
        />
        <main className={s.main}>{children}</main>
      </div>
    </Meta>
  )
}

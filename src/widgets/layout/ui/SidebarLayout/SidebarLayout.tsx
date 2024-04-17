import { PropsWithChildren } from 'react'

import { useLogoutMutation, useMeQuery } from '@/feature/auth'
import { baseApi } from '@/shared/api'
import { AuthRoutes } from '@/shared/const/routes'
import { handleErrorResponse } from '@/shared/helpers'
import { useAppDispatch, useTranslation } from '@/shared/hooks'
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

  const dispatch = useAppDispatch()

  const { data } = useMeQuery(undefined)

  const [logout, { isLoading }] = useLogoutMutation()

  const { t } = useTranslation()

  const handleLogout = () => {
    logout().then(res => {
      if ('data' in res) {
        localStorage.removeItem('sign-in')

        void push(AuthRoutes.SIGN_IN)
      }
      if ('error' in res) {
        if ('status' in res.error && res.error.status === 401) {
          // if refresh token expired
          dispatch(baseApi.util?.resetApiState())
          void push(AuthRoutes.SIGN_IN)
        } else {
          handleErrorResponse(res.error)
        }
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
          items={getSidebarItems(t, data?.id)}
          onLogout={handleLogout}
        />
        <main className={s.main}>{children}</main>
      </div>
    </Meta>
  )
}

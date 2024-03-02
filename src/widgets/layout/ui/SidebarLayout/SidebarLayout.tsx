import { PropsWithChildren } from 'react'

import { useLogoutMutation } from '@/feature/auth'
import { Search, Trending } from '@/shared/assets/icons/common'
import { Bookmark, Home, MessageCircle, Person, PlusSquare } from '@/shared/assets/icons/fill'
import {
  Bookmark as BookmarkOutline,
  Home as HomeOutline,
  MessageCircle as MessageCircleOutline,
  Person as PersonOutline,
  PlusSquare as PlusSquareOutline,
} from '@/shared/assets/icons/outline'
import { AppRoutes } from '@/shared/const/routes'
import { handleErrorResponse } from '@/shared/helpers/handleErrorResponse'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Header } from '@/widgets/header'
import { Sidebar } from '@/widgets/sidebar/ui/Sidebar/Sidebar'
import { useRouter } from 'next/router'

import s from './SidebarLayout.module.scss'

export const SidebarLayout = ({ children }: PropsWithChildren) => {
  const [logOut, { isLoading }] = useLogoutMutation()
  const { push } = useRouter()

  const { t } = useTranslation()

  const SIDEBAR_ITEMS = [
    {
      activeIcon: <Home />,
      href: '/home',
      icon: <HomeOutline />,
      title: t.layout.sidebar.home,
    },
    {
      activeIcon: <PlusSquare />,
      href: '/create',
      icon: <PlusSquareOutline />,
      title: t.layout.sidebar.create,
    },
    {
      activeIcon: <Person />,
      href: '/profile',
      icon: <PersonOutline />,
      title: t.layout.sidebar.profile,
    },
    {
      activeIcon: <MessageCircle />,
      href: '/messenger',
      icon: <MessageCircleOutline />,
      title: t.layout.sidebar.messenger,
    },
    {
      activeIcon: <Search />,
      href: '/search',
      icon: <Search />,
      title: t.layout.sidebar.search,
    },
    {
      activeIcon: <Trending />,
      href: '/statistics',
      icon: <Trending />,
      showForOnlyPremium: true,
      title: t.layout.sidebar.statistics,
    },
    {
      activeIcon: <Bookmark />,
      href: '/favorites',
      icon: <BookmarkOutline />,
      title: t.layout.sidebar.favorites,
    },
  ]

  const handleLogOut = () => {
    logOut().then(res => {
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
          items={SIDEBAR_ITEMS}
          onLogOut={handleLogOut}
        />
        <main className={s.main}>{children}</main>
      </div>
    </>
  )
}

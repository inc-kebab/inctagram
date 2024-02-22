import { PropsWithChildren } from 'react'
import { toast } from 'react-toastify'

import { Search, Trending } from '@/shared/assets/icons/common'
import { Bookmark, Home, MessageCircle, Person, PlusSquare } from '@/shared/assets/icons/fill'
import {
  Bookmark as BookmarkOutline,
  Home as HomeOutline,
  MessageCircle as MessageCircleOutline,
  Person as PersonOutline,
  PlusSquare as PlusSquareOutline,
} from '@/shared/assets/icons/outline'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Header } from '@/widgets/header'
import { Sidebar } from '@/widgets/sidebar/ui/Sidebar/Sidebar'

import s from './SidebarLayout.module.scss'

export const SidebarLayout = ({ children }: PropsWithChildren) => {
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

  return (
    <>
      <Header />
      <div className={s.wrapper}>
        <Sidebar
          buttonName={t.layout.sidebar.logout}
          items={SIDEBAR_ITEMS}
          onLogout={() => {
            toast.success('Call handler for Log Out')
          }}
        />
        <main className={s.main}>{children}</main>
      </div>
    </>
  )
}

import { PropsWithChildren } from 'react'
import { toast } from 'react-toastify'

import { Search, Tranding } from '@/shared/assets/icons/common'
import { Bookmark, Home, MessageCircle, Person, PlusSquare } from '@/shared/assets/icons/fill'
import {
  Bookmark as BookmarkOutline,
  Home as HomeOutline,
  MessageCircle as MessageCircleOutline,
  Person as PersonOutline,
  PlusSquare as PlusSquareOutline,
} from '@/shared/assets/icons/outline'
import { Header } from '@/widgets/header'
import { Sidebar } from '@/widgets/sidebar/ui/Sidebar/Sidebar'

import s from './SidebarLayout.module.scss'

const SIDEBAR_ITEMS = [
  {
    activeIcon: <Home />,
    href: '/home',
    icon: <HomeOutline />,
    title: 'Home',
  },
  {
    activeIcon: <PlusSquare />,
    href: '/create',
    icon: <PlusSquareOutline />,
    title: 'Create',
  },
  {
    activeIcon: <Person />,
    href: '/profile',
    icon: <PersonOutline />,
    title: 'My profile',
  },
  {
    activeIcon: <MessageCircle />,
    href: '/messenger',
    icon: <MessageCircleOutline />,
    title: 'Messenger',
  },
  {
    activeIcon: <Search />,
    href: '/search',
    icon: <Search />,
    title: 'Search',
  },
  {
    activeIcon: <Tranding />,
    href: '/statistics',
    icon: <Tranding />,
    showForOnlyPremium: true,
    title: 'Statistics',
  },
  {
    activeIcon: <Bookmark />,
    href: '/favorites',
    icon: <BookmarkOutline />,
    title: 'Favorites',
  },
]

export const SidebarLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <div className={s.wrapper}>
        <Sidebar
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

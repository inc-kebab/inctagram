import { LocaleType } from '@/../locales'
import { Search, Trending } from '@/shared/assets/icons/common'
import { Bookmark, Home, MessageCircle, Person, PlusSquare } from '@/shared/assets/icons/fill'
import {
  Bookmark as BookmarkOutline,
  Home as HomeOutline,
  MessageCircle as MessageCircleOutline,
  Person as PersonOutline,
  PlusSquare as PlusSquareOutline,
} from '@/shared/assets/icons/outline'

export const getSidebarItems = (t: LocaleType) => {
  return [
    {
      activeIcon: <Home />,
      href: '/home',
      icon: <HomeOutline />,
      title: t.layout.sidebar.home,
    },
    {
      activeIcon: <PlusSquare />,
      href: '',
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
}

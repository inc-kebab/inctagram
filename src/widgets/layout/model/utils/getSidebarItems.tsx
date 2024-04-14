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
import { AppRoutes } from '@/shared/const/routes'

export const getSidebarItems = (t: LocaleType, id?: number) => {
  return [
    {
      activeIcon: <Home />,
      href: AppRoutes.HOME,
      icon: <HomeOutline />,
      title: t.layout.sidebar.home,
    },
    {
      activeIcon: <PlusSquare />,
      href: AppRoutes.CREATE_POST,
      icon: <PlusSquareOutline />,
      title: t.layout.sidebar.create,
    },
    {
      activeIcon: <Person />,
      href: AppRoutes.PROFILE + `/${id}`,
      icon: <PersonOutline />,
      title: t.layout.sidebar.profile,
    },
    {
      activeIcon: <MessageCircle />,
      href: AppRoutes.MESSENGER,
      icon: <MessageCircleOutline />,
      title: t.layout.sidebar.messenger,
    },
    {
      activeIcon: <Search />,
      href: AppRoutes.SEARCH,
      icon: <Search />,
      title: t.layout.sidebar.search,
    },
    {
      activeIcon: <Trending />,
      href: AppRoutes.STATISTICS,
      icon: <Trending />,
      showForOnlyPremium: true,
      title: t.layout.sidebar.statistics,
    },
    {
      activeIcon: <Bookmark />,
      href: AppRoutes.FAVORITES,
      icon: <BookmarkOutline />,
      title: t.layout.sidebar.favorites,
    },
  ]
}

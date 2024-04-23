import { LocaleType } from '@/../locales'
import { Search } from '@/shared/assets/icons/common'
import { Home, MessageCircle, Person, PlusSquare } from '@/shared/assets/icons/fill'
import {
  Home as HomeOutline,
  MessageCircle as MessageCircleOutline,
  Person as PersonOutline,
  PlusSquare as PlusSquareOutline,
} from '@/shared/assets/icons/outline'
import { AppRoutes } from '@/shared/const/routes'

export const getMobileSidebarItems = (t: LocaleType, id?: number) => {
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
      activeIcon: <Person />,
      href: AppRoutes.PROFILE + `/${id}`,
      icon: <PersonOutline />,
      title: t.layout.sidebar.profile,
    },
  ]
}

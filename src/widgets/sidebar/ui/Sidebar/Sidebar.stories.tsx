import type { Meta, StoryObj } from '@storybook/react'

import { Search, Tranding } from '@/shared/assets/icons/common'
import { Bookmark, Home, MessageCircle, Person, PlusSquare } from '@/shared/assets/icons/fill'
import {
  Bookmark as BookmarkOutline,
  Home as HomeOutline,
  MessageCircle as MessageCircleOutline,
  Person as PersonOutline,
  PlusSquare as PlusSquareOutline,
} from '@/shared/assets/icons/outline'

import { Sidebar } from './Sidebar'

const meta = {
  argTypes: {
    items: {
      description: 'Array sidebar items',
    },
  },
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/create',
      },
    },
  },
  tags: ['autodocs'],
  title: 'widgets/Sidebar/Bar',
} satisfies Meta<typeof Sidebar>

export default meta

type Story = StoryObj<typeof meta>

export const Demo: Story = {
  args: {
    items: [
      {
        activeIcon: <Home />,
        href: '/',
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
        href: 'messenger',
        icon: <MessageCircleOutline />,
        title: 'Messenger',
      },
      {
        activeIcon: <Search />,
        href: 'search',
        icon: <Search />,
        title: 'Search',
      },
      {
        activeIcon: <Tranding />,
        href: 'statistics',
        icon: <Tranding />,
        showForOnlyPremium: true,
        title: 'Statistics',
      },
      {
        activeIcon: <Bookmark />,
        href: 'favorites',
        icon: <BookmarkOutline />,
        title: 'Favorites',
      },
    ],
  },
}

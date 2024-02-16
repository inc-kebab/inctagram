import type { Meta, StoryObj } from '@storybook/react'

import { Home } from '@/shared/assets/icons/fill'
import { Home as HomeOutline } from '@/shared/assets/icons/outline'

import { SidebarItem } from './SidebarItem'

const meta = {
  argTypes: {}, // TODO
  component: SidebarItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'widgets/Sidebar/Item',
} satisfies Meta<typeof SidebarItem>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    item: {
      activeIcon: <Home />,
      href: '/',
      icon: <HomeOutline />,
      title: 'Home',
    },
  },
}

export const Active: Story = {
  args: {
    isActive: true,
    item: {
      activeIcon: <Home />,
      href: '/',
      icon: <HomeOutline />,
      title: 'Home',
    },
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    item: {
      activeIcon: <Home />,
      href: '/',
      icon: <HomeOutline />,
      title: 'Home',
    },
  },
}

import type { Meta, StoryObj } from '@storybook/react'

import { Home } from '@/shared/assets/icons/fill'
import { Home as HomeOutline } from '@/shared/assets/icons/outline'

import { SidebarItem } from './SidebarItem'

const meta = {
  argTypes: {
    disabled: {
      description: 'Flag for blocking interaction',
    },
    isActive: {
      description: 'Flag for change style active element',
    },
    isLastGroupItem: {
      description: 'Flag for increasing the margin from the bottom',
    },
    item: {
      control: false,
      description: 'Current sidebar item data',
    },
  },
  component: SidebarItem,
  parameters: {
    docs: {
      description: {
        component:
          'The SidebarItem component in React is a versatile element used to represent individual items within a sidebar navigation menu. This component allows for the creation of interactive and visually distinct sidebar items that can be customized based on various states and properties.',
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'widgets/Layout/Sidebar/Item',
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

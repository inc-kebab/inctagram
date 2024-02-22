import type { Meta, StoryObj } from '@storybook/react'

import { SidebarLayout } from './SidebarLayout'

const meta = {
  argTypes: {
    children: {
      description: 'Page content',
    },
  },
  component: SidebarLayout,
  parameters: {
    docs: {
      description: {
        component: 'Layout for sidebar pages.',
      },
    },
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  title: 'widgets/Layout/SidebarLayout',
} satisfies Meta<typeof SidebarLayout>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

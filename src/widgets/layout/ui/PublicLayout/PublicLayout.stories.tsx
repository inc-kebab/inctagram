import type { Meta, StoryObj } from '@storybook/react'

import { PublicLayout } from './PublicLayout'

const meta = {
  argTypes: {
    children: {
      description: 'Page content',
    },
  },
  component: PublicLayout,
  parameters: {
    docs: {
      description: {
        component: 'Layout for pages with access for unauthorized users.',
      },
    },
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  title: 'widgets/Layout/PublicLayout',
} satisfies Meta<typeof PublicLayout>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

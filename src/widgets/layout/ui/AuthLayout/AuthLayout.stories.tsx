import type { Meta, StoryObj } from '@storybook/react'

import { AuthLayout } from './AuthLayout'

const meta = {
  argTypes: {
    children: {
      description: 'Page content',
    },
  },
  component: AuthLayout,
  parameters: {
    docs: {
      description: {
        component: 'Layout for pages related to authorization/registration.',
      },
    },
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  title: 'widgets/Layout/AuthLayout',
} satisfies Meta<typeof AuthLayout>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

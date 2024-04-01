import type { Meta, StoryObj } from '@storybook/react'

import { Header } from './Header'

const meta = {
  argTypes: {
    isUnauthorized: {
      control: 'boolean',
      description: 'Flag for show/hide sign-in/sign-up links',
    },
  },
  component: Header,
  parameters: {
    docs: {
      description: {
        component:
          'A simple component for the application header. It has only 2 states. Additionally, it has a language change logic.',
      },
    },
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  title: 'widgets/Layout/Header',
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Auth: Story = {
  args: {},
}

export const NoAuth: Story = {
  args: { isUnauthorized: true },
}

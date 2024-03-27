import { Button } from '@/shared/ui/Button'
import { Meta, StoryObj } from '@storybook/react'

import { UserBanner } from './UserBanner'

const meta: Meta<typeof UserBanner> = {
  argTypes: {
    actions: {
      action: 'action',
      description: 'Actions or components to be rendered at the end of the user banner.',
    },
    avatar: {
      description: 'URL of the user avatar image.',
    },
    avatarSize: {
      description: 'Size of the avatar image in pixels.',
    },
    className: {
      description: 'Additional CSS class names for styling.',
    },
    name: {
      description: 'Name of the user.',
    },
  },
  component: UserBanner,
  tags: ['autodocs'],
  title: 'components/UserBanner',
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { name: 'UserName' } }

export const WithButton: Story = {
  args: {
    actions: <Button>Your component will be placed here.</Button>,
    name: 'UserName',
  },
}

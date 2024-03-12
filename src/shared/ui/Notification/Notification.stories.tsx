import type { StoryObj } from '@storybook/react'

import { Notification } from '@/shared/ui/Notification/Notification'

const meta = {
  argTypes: {
    error: { description: 'Error description' },
    success: { description: 'Success description' },
  },
  component: Notification,
  tags: ['autodocs'],
  title: 'shared/Notifcation',
}

export default meta
type Story = StoryObj<typeof meta>

export const NotificationWithError: Story = {
  args: {
    error:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut ',
  },
}

export const NotificationWithSuccess: Story = {
  args: {
    success:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut ',
  },
}

import type { Meta, StoryObj } from '@storybook/react'

import { Notification } from '@/shared/ui/Notification/Notification'

const meta = {
  argTypes: {},
  component: Notification,
  tags: ['autodocs'],
  title: 'shared/Notifcation',
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

import type { Meta, StoryObj } from '@storybook/react'

import { CounterRegisteredUsers } from './CounterRegisteredUsers'

const meta = {
  argTypes: {
    count: {
      control: 'number',
      description: 'Current count of registered users',
    },
  },
  component: CounterRegisteredUsers,
  tags: ['autodocs'],
  title: 'entities/User/CounterRegisteredUsers',
} satisfies Meta<typeof CounterRegisteredUsers>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    count: 34566,
  },
}

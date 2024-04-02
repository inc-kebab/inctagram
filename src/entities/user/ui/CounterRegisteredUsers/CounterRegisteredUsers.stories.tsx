import type { Meta, StoryObj } from '@storybook/react'

import { CounterRegisteredUsers } from './CounterRegisteredUsers'

const meta = {
  argTypes: {},
  component: CounterRegisteredUsers,
  parameters: {
    layout: 'fullscreen', //change
  },
  title: 'components/CounterRegisteredUsers', //change
} satisfies Meta<typeof CounterRegisteredUsers>

export default meta

type Story = StoryObj<typeof meta>

export const Demo: Story = {
  args: {},
}

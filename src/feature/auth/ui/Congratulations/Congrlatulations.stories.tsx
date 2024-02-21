import { Meta, StoryObj } from '@storybook/react'

import { Congratulations } from '../../index'

const meta: Meta<typeof Congratulations> = {
  component: Congratulations,
  parameters: {
    description: {
      component: "This page confirms that the user's email has been successfully confirmed.",
    },
  },
  tags: ['autodocs'],
  title: 'feature/Auth/Congratulations',
}

export default meta

type Story = StoryObj<typeof Congratulations>

export const Default: Story = {
  args: {},
}

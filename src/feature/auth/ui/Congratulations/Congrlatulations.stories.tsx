import { Meta, StoryObj } from '@storybook/react'

import { Congratulations } from './Congratulations'

const meta: Meta<typeof Congratulations> = {
  component: Congratulations,
  parameters: {
    docs: {
      description: {
        component: "This page confirms that the user's email has been successfully confirmed.",
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'feature/Auth/Congratulations',
}

export default meta

type Story = StoryObj<typeof Congratulations>

export const Default: Story = {
  args: {},
}

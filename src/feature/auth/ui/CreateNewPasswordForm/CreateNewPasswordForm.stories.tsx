import type { Meta, StoryObj } from '@storybook/react'

import { CreateNewPasswordForm } from './CreateNewPasswordForm'

const meta: Meta<typeof CreateNewPasswordForm> = {
  argTypes: {
    onSubmit: {
      description: 'onSubmit handler',
    },
  },
  component: CreateNewPasswordForm,
  tags: ['autodocs'],
  title: 'feature/forms/CreateNewPasswordForm',
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

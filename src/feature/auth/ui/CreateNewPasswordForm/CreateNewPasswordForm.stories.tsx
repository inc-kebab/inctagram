import type { Meta, StoryObj } from '@storybook/react'

import { CreateNewPasswordForm } from '../index'

const meta: Meta<typeof CreateNewPasswordForm> = {
  argTypes: {
    onSubmit: {
      action: 'Form submitted',
      description: 'onSubmit handler',
    },
  },
  component: CreateNewPasswordForm,
  tags: ['autodocs'],
  title: 'feature/Auth/CreateNewPasswordForm',
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

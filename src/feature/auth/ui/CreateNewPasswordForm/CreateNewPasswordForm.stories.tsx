import type { Meta, StoryObj } from '@storybook/react'

import { CreateNewPasswordForm } from './CreateNewPasswordForm'

const meta: Meta<typeof CreateNewPasswordForm> = {
  argTypes: {
    onSubmit: {
      action: 'Form submitted',
      description: 'onSubmit handler',
    },
  },
  component: CreateNewPasswordForm,
  parameters: {
    docs: {
      description: {
        component: 'Form for create new password.',
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'feature/Auth/CreateNewPasswordForm',
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

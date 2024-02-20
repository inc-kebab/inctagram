import type { Meta, StoryObj } from '@storybook/react'

import { ForgotPasswordForm } from './ForgotPassword'

const meta = {
  argTypes: {
    onSubmit: {
      action: 'Form sent',
      description:
        'Is used to pass a handler function that will be called when the form is submitted',
    },
  },
  component: ForgotPasswordForm,
  parameters: {
    docs: {
      description: {
        component: 'Password recovery form',
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'feature/auth/ForgotPasswordForm',
} satisfies Meta<typeof ForgotPasswordForm>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

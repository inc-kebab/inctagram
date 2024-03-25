import type { Meta, StoryObj } from '@storybook/react'

import { ForgotPasswordForm } from './ForgotPasswordForm'

const meta = {
  argTypes: {
    disabled: {
      description: 'Disabled for form component',
    },
    isError: {
      control: false,
      description: 'Flag for reset recaptcha',
    },
    isSuccess: {
      description: 'Flag for hide recaptcha when response return success status',
    },
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
  title: 'feature/Auth/ForgotPasswordForm',
} satisfies Meta<typeof ForgotPasswordForm>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

import type { Meta, StoryObj } from '@storybook/react'

import { ForgotPassword } from './ForgotPassword'

const meta = {
  argTypes: {
    onSubmit: {
      control: false,
      description:
        'Is used to pass a handler function that will be called when the form is submitted',
    },
  },
  component: ForgotPassword,
  parameters: {
    docs: {
      description: {
        component: 'Password recovery form',
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'feature/auth/ForgotPassword',
} satisfies Meta<typeof ForgotPassword>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

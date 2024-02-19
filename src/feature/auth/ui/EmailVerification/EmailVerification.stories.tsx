import type { Meta, StoryObj } from '@storybook/react'

import { EmailVerification } from './EmailVerification'

const meta = {
  argTypes: {
    onResendLink: {
      action: 'resend verification link',
      description: 'Callback for resend verification link',
    },
  },
  component: EmailVerification,
  parameters: {
    docs: {
      description: {
        component: 'The component allows you to do a resubmission of the verification link',
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'feature/auth/EmailVerification',
} satisfies Meta<typeof EmailVerification>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onResendLink: () => {},
  },
}

import type { Meta, StoryObj } from '@storybook/react'

import { EmailVerification } from './EmailVerification'

const meta = {
  component: EmailVerification,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'feature/auth/EmailVerification',
} satisfies Meta<typeof EmailVerification>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

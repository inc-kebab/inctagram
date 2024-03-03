import type { Meta, StoryObj } from '@storybook/react'

import { LogoutDialog } from './LogoutDialog'

const meta = {
  argTypes: {
    disabled: {
      description: 'Flag for disabled button inside dialog',
    },
    onLogout: {
      action: 'Success Logout',
      description: 'Success ',
    },
  },
  component: LogoutDialog,
  parameters: {
    docs: {
      description: {
        component: 'Dialog component for confirm logout action',
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'feature/Auth/LogoutDialog',
} satisfies Meta<typeof LogoutDialog>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

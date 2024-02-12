import type { Meta, StoryObj } from '@storybook/react'

import { TextField } from '@/shared/ui/TextField'

const meta: Meta<typeof TextField> = {
  argTypes: {
    type: ['email', 'password', 'search'],
  },
  component: TextField,
  tags: ['autodocs'],
  title: 'shared/TextField',
}

export default meta
type Story = StoryObj<typeof meta>

export const Email: Story = {
  args: {
    label: 'Email',
    type: 'email',
    width: '350px',
  },
}

export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    width: '350px',
  },
}

export const Search: Story = {
  args: {
    type: 'search',
    width: '350px',
  },
}

export const PasswordWithError: Story = {
  args: {
    error: 'password must be longer',
    label: 'Password',
    type: 'password',
    value: 'qwerty',
    width: '350px',
  },
}

export const PasswordDisabled: Story = {
  args: {
    disabled: true,
    label: 'Password',
    type: 'password',
    width: '350px',
  },
}

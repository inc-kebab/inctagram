import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

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

export const Default: Story = {}

export const WithLabel: Story = {
  args: {
    label: 'Label',
  },
}

export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
  },
}

export const Search: Story = {
  decorators: [
    () => {
      const [value, setValue] = useState('')

      return <TextField onValueChange={setValue} type="search" value={value} />
    },
  ],
}

export const PasswordWithError: Story = {
  args: {
    error: 'password must be longer',
    label: 'Password',
    type: 'password',
  },
}

export const PasswordDisabled: Story = {
  args: {
    disabled: true,
    label: 'Password',
    type: 'password',
  },
}

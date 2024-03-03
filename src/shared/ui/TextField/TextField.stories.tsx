import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { TextField } from '@/shared/ui/TextField'

const meta: Meta<typeof TextField> = {
  argTypes: {
    classNameInput: {
      description: 'Styles directly for the input tag',
    },
    error: {
      description: 'String describing the error',
    },
    label: {
      description: 'Label',
    },
    onValueChange: {
      description: 'The function is used to handle changes in the input field value.',
    },
    type: {
      control: { type: 'radio' },
      description: 'Current value for controlled text field',
      variant: ['email', 'password', 'search'],
    },
  },
  component: TextField,
  parameters: {
    docs: {
      description: {
        component:
          'The TextField component in React offers a versatile input field with additional features like error handling, label support, and customizable input types such as `email`, `password`, and `search`.',
      },
    },
  },
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

export const Email: Story = {
  args: {
    label: 'Email',
    type: 'email',
  },
}

export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
  },
}

export const Search: Story = {
  args: {
    label: 'Search',
    type: 'search',
  },
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

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('')

    return (
      <>
        <div style={{ marginBottom: 10 }}>Value in state: {value}</div>
        <TextField onValueChange={setValue} type="search" value={value} />
      </>
    )
  },
}

import User from '@/shared/assets/icons/fill/image.svg'
import { Meta, StoryObj } from '@storybook/react'

import { Button } from './index'

const meta: Meta<typeof Button> = {
  argTypes: {
    variant: {
      control: { disabled: 'radio' },
      options: ['primary', 'secondary', 'outline', 'text'],
    },
  },
  component: Button,
  tags: ['autodocs'],
  title: 'shared/Button',
}

export default meta
type Story = StoryObj<typeof Button>
export const Primary: Story = {
  args: {
    children: 'Primary Button',
    disabled: false,
    variant: 'primary',
  },
}

export const Outline: Story = {
  args: {
    children: 'Outline Button',
    disabled: false,
    variant: 'outline',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    disabled: false,
    variant: 'secondary',
  },
}

export const Text: Story = {
  args: {
    children: 'Text Button',
    disabled: false,
    variant: 'text',
  },
}

export const Link: Story = {
  args: {
    as: 'a',
    children: 'Text Button',
    disabled: false,
    href: '#',
    variant: 'text',
  },
}

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <User />
        <span>User</span>
      </>
    ),
    disabled: false,
    variant: 'secondary',
  },
}

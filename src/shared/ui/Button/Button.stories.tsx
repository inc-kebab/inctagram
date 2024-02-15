import { Image } from '@/shared/assets/icons/fill'
import { Meta, StoryObj } from '@storybook/react'

import { Button } from './index'

const meta: Meta<typeof Button> = {
  argTypes: {
    as: {
      description: 'html element',
    },
    children: {
      description: 'text in button',
    },
    className: {
      description: 'className',
    },
    disabled: {
      control: 'boolean',
      description: 'disabled',
    },
    endIcon: {
      description: 'icon after text in button',
    },
    startIcon: {
      description: 'icon before text in button',
    },
    variant: {
      control: { type: 'radio' },
      description: 'button style variants',
      options: ['primary', 'secondary', 'outline', 'text'],
    },
  },
  component: Button,
  parameters: {
    docs: {
      description: {
        component:
          'The Button component is polymorphic, meaning it can be rendered as different HTML elements based on the value of the "as" prop. By default, it renders as a `<button>` element, but you can also specify other HTML tags such as `<a>` to render the Button as a link or any other valid HTML element.',
      },
    },
  },
  tags: ['autodocs'],
  title: 'shared/Button',
}

export default meta

type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
}

export const Outline: Story = {
  args: {
    children: 'Outline Button',
    variant: 'outline',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
}

export const Text: Story = {
  args: {
    children: 'Text Button',
    variant: 'text',
  },
}

export const FullWidth: Story = {
  args: {
    children: 'Primary Button',
    fullWidth: true,
    variant: 'primary',
  },
}

export const AsLink: Story = {
  args: {
    as: 'a',
    children: 'Text Button',
    href: '#',
    variant: 'text',
  },
}

export const WithIcons: Story = {
  args: {
    children: 'User',
    endIcon: <Image />,
    startIcon: <Image />,
    variant: 'secondary',
  },
}

import { Meta, StoryObj } from '@storybook/react'
import { Typography } from './Typography'

const meta = {
  component: Typography,
  title: 'Shared/Typography',
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: { type: 'select' },
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'a'],
      description: 'Html Element',
    },
    children: {
      control: { type: 'text' },
      description: 'Text Content'
    },
    textAlign: {
      control: { type: 'select' },
      options: ['start', 'center', 'end', 'inherit'],
      description: 'Text Content position inner Html Element'
    },
    variant: {
      options: [
        'large',
        'h1',
        'h2',
        'h3',
        'regular16',
        'regularBold16',
        'regular14',
        'regularMedium14',
        'regularBold14',
        'small',
        'smallSemiBold',
        'regularLink',
        'smallLink',
      ],
      control: { type: 'radio' },
      description: 'typography sizes',
      defaultValue: 'regular16'
    },
  },
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const Large: Story = {
  args: {
    as: 'p',
    variant: 'large',
    textAlign: 'start',
    children:
      'Large - Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum, voluptate perspiciatis laudantium odit quod nihil, excepturi veniam officia maiores vero, tenetur doloribus! Molestias officia error temporibus cum. Commodi, quam odit.',
  },
}

export const H1: Story = {
  args: {
    as: 'h1',
    variant: 'h1',
    textAlign: 'start',
    children: 'H1 - Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
  },
}
export const H2: Story = {
  args: {
    as: 'h2',
    variant: 'h2',
    textAlign: 'start',
    children: 'H2 - Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
  },
}
export const H3: Story = {
  args: {
    as: 'h3',
    variant: 'h3',
    textAlign: 'start',
    children: 'H3 - Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
  },
}
export const Regular16: Story = {
  args: {
    as: 'p',
    variant: 'regular16',
    textAlign: 'start',
    children: 'Regular16 - Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
  },
}
export const RegularBold16: Story = {
  args: {
    as: 'p',
    variant: 'regularBold16',
    textAlign: 'start',
    children: 'RegularBold16 - Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
  },
}
export const Regular14: Story = {
  args: {
    as: 'p',
    variant: 'regular14',
    textAlign: 'start',
    children: 'Regular14 - Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
  },
}
export const RegularMedium14: Story = {
  args: {
    as: 'p',
    variant: 'regularMedium14',
    textAlign: 'start',
    children: 'RegularMedium14 - Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
  },
}
export const RegularBold14: Story = {
  args: {
    as: 'p',
    variant: 'regularBold14',
    textAlign: 'start',
    children: 'RegularBold14 - Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
  },
}
export const Small: Story = {
  args: {
    as: 'p',
    variant: 'small',
    textAlign: 'start',
    children: 'Small - Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
  },
}
export const RegularLink: Story = {
  args: {
    as: 'a',
    href: '#',
    variant: 'regularLink',
    textAlign: 'start',
    children: 'RegularLink - Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
  },
}

export const SmallLink: Story = {
  args: {
    as: 'a',
    href: '#',
    variant: 'smallLink',
    textAlign: 'start',
    children: 'SmallLink - Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
  },
}

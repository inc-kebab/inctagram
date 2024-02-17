import { Meta, StoryObj } from '@storybook/react'

import { Typography } from './Typography'

const meta = {
  argTypes: {
    asComponent: {
      control: { type: 'select' },
      description: 'Html Element',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'a'],
    },
    children: {
      control: { type: 'text' },
      description: 'Text Content',
    },
    ref: {
      control: false,
      description: 'standart ref props',
    },
    textAlign: {
      control: { type: 'select' },
      description: 'Text Content position inner Html Element',
      options: ['start', 'center', 'end', 'inherit'],
    },
    variant: {
      control: { type: 'radio' },
      description: 'typography sizes',
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
    },
  },
  component: Typography,
  tags: ['autodocs'],
  title: 'Shared/Typography',
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const Large: Story = {
  args: {
    asComponent: 'p',
    children:
      'Large - Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum, voluptate perspiciatis laudantium odit quod nihil, excepturi veniam officia maiores vero, tenetur doloribus! Molestias officia error temporibus cum. Commodi, quam odit.',
    textAlign: 'start',
    variant: 'large',
  },
}

export const H1: Story = {
  args: {
    asComponent: 'h1',
    children: 'H1 - Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
    textAlign: 'start',
    variant: 'h1',
  },
}
export const H2: Story = {
  args: {
    asComponent: 'h2',
    children: 'H2 - Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
    textAlign: 'start',
    variant: 'h2',
  },
}
export const H3: Story = {
  args: {
    asComponent: 'h3',
    children: 'H3 - Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
    textAlign: 'start',
    variant: 'h3',
  },
}
export const Regular16: Story = {
  args: {
    children: 'Regular16 - Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
    textAlign: 'start',
    variant: 'regular16',
  },
}
export const RegularBold16: Story = {
  args: {
    children: 'RegularBold16 - Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
    textAlign: 'start',
    variant: 'regularBold16',
  },
}
export const Regular14: Story = {
  args: {
    children: 'Regular14 - Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
    textAlign: 'start',
    variant: 'regular14',
  },
}
export const RegularMedium14: Story = {
  args: {
    children: 'RegularMedium14 - Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
    textAlign: 'start',
    variant: 'regularMedium14',
  },
}
export const RegularBold14: Story = {
  args: {
    children: 'RegularBold14 - Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
    textAlign: 'start',
    variant: 'regularBold14',
  },
}
export const Small: Story = {
  args: {
    children: 'Small - Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
    textAlign: 'start',
    variant: 'small',
  },
}
export const RegularLink: Story = {
  args: {
    as: 'a',
    children: 'RegularLink - Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
    href: '#',
    textAlign: 'start',
    variant: 'regularLink',
  },
}

export const SmallLink: Story = {
  args: {
    as: 'a',
    children: 'SmallLink - Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
    href: '#',
    textAlign: 'start',
    variant: 'smallLink',
  },
}

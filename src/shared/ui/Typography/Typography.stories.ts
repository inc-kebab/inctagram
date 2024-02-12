import { Meta, StoryObj } from '@storybook/react'
import Typography from './Typography'

const meta = {
  component: Typography,
  title: 'Components/Typography',
  tags: ['autodocs'],
  argTypes: {
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
      description: 'Typography',
    },
  },
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const Large: Story = {
  args: {
    variant: 'large',
    textAlign: 'start',
    children:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum, voluptate perspiciatis laudantium odit quod nihil, excepturi veniam officia maiores vero, tenetur doloribus! Molestias officia error temporibus cum. Commodi, quam odit.',
  },
}

export const H1: Story = {
  args: {
    variant: 'h1',
    textAlign: 'start',
    children:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
  },
}
export const H2: Story = {
  args: {
    variant: 'h2',
    textAlign: 'start',
    children:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
  },
}
export const H3: Story = {
  args: {
    variant: 'h3',
    textAlign: 'start',
    children:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
  },
}
export const Regular16: Story = {
  args: {
    variant: 'regular16',
    textAlign: 'start',
    children:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
  },
}
export const RegularBold16: Story = {
  args: {
    variant: 'regularBold16',
    textAlign: 'start',
    children:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
  },
}
export const Regular14: Story = {
  args: {
    variant: 'regular14',
    textAlign: 'start',
    children:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
  },
}
export const RegularMedium14: Story = {
  args: {
    variant: 'regularMedium14',
    textAlign: 'start',
    children:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
  },
}
export const RegularBold14: Story = {
  args: {
    variant: 'regularBold14',
    textAlign: 'start',
    children:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
  },
}
export const small: Story = {
  args: {
    variant: 'small',
    textAlign: 'start',
    children:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
  },
}
export const RegularLink: Story = {
  args: {
    variant: 'regularLink',
    textAlign: 'start',
    children:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
  },
}

export const SmallLink: Story = {
  args: {
    variant: 'smallLink',
    textAlign: 'start',
    children:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
  },
}
import type { Meta, StoryObj } from '@storybook/react'

import { Skeleton } from './Skeleton'

const meta = {
  argTypes: {
    border: {
      control: 'number',
      description: 'Border radius skeleton, number - px, string - percents',
    },
    className: {
      control: false,
      description: 'The class that is passed from the parent component is used for positioning.',
    },
    height: {
      control: 'number',
      description: 'Height skeleton, number - px, string - percents',
    },
    width: {
      control: 'number',
      description: 'Width skeleton, number - px, string - percents',
    },
  },
  component: Skeleton,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  title: 'shared/Skeleton',
} satisfies Meta<typeof Skeleton>

export default meta

type Story = StoryObj<typeof meta>

export const FullWidth: Story = {
  args: {
    height: 200,
    width: '100%',
  },
}

export const Circle: Story = {
  args: {
    border: '50%',
    height: '100px',
    width: '100px',
  },
  parameters: {
    layout: 'centered',
  },
}

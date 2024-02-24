import type { Meta, StoryObj } from '@storybook/react'

import { Loader } from './Loader'

const meta = {
  argTypes: {
    fullHeight: {
      control: 'boolean',
      description: 'Flag for render loader with height: `100vh`',
    },
    size: {
      control: 'number',
      description: 'Size in `px` for loader',
    },
  },
  component: Loader,
  parameters: {
    docs: {
      description: 'Loader component',
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'shared/Loader',
} satisfies Meta<typeof Loader>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

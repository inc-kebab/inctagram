import type { Meta, StoryObj } from '@storybook/react'

import { TextArea } from './TextArea'

const meta: Meta<typeof TextArea> = {
  argTypes: {
    error: {
      description: 'String describing the error',
    },
    label: {
      description: 'Label',
    },
  },
  component: TextArea,
  tags: ['autodocs'],
  title: 'shared/TextArea',
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithLabel: Story = {
  args: {
    label: 'Label',
  },
}

export const WithError: Story = {
  args: {
    error: 'Error text',
    label: 'Label',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Label',
    value: 'Lorem ipsum',
  },
}

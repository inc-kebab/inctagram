import type { Meta, StoryObj } from '@storybook/react'

import { Card } from './Card'

const meta = {
  component: Card,
  parameters: {
    docs: {
      description: {
        component:
          'The Card component serves as a simple wrapper for creating card-like UI elements in React. It allows for easy styling customization through the provided className prop.',
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'shared/Card',
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Card',
  },
  render: args => <Card style={{ padding: 50, textAlign: 'center', width: 300 }} {...args} />,
}

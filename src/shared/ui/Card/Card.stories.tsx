import type { Meta, StoryObj } from '@storybook/react'

import { Card } from './Card'

const meta = {
  component: Card,
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

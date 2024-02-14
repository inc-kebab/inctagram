import { Dialog } from './Dialog'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'shared/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'title for Modal Dialog'
    },
    description: {
      control: { type: 'text' },
      description: 'description for Modal Dialog'
    },
    trigger: {
      control: false,
      description: 'The component for accept Modal Dialog'
    },
    className: {
      control: false,
      description: 'Class Name to extend styles'
    }
  },
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof Dialog>

export const Modal: Story = {
  args: {
    title: 'Dialog modal',
    description: 'We have sent a link to confirm your email to epam@epam.com',
  },
}

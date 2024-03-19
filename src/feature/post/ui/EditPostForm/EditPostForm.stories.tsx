import { EditPostForm } from '@/feature/post'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'disabled submit button when loading',
    },
    onSubmit: {
      action: 'edit post',
      description: 'function for edit post on the server',
    },
  },
  component: EditPostForm,
  tags: ['autodocs'],
  title: 'feature/Post/EditPostForm',
} satisfies Meta<typeof EditPostForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

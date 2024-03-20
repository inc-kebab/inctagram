import { Meta, StoryObj } from '@storybook/react'

import { EditPostForm } from './EditPostForm'

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
  decorators: [
    Story => (
      <div style={{ width: 600 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: 'Form for edit post description',
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'feature/Post/EditPostForm',
} satisfies Meta<typeof EditPostForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

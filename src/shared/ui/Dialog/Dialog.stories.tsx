import { Meta, StoryObj } from '@storybook/react'

import { Dialog } from './Dialog'

const meta = {
  argTypes: {
    children: {
      control: false,
      description: 'description for Modal Dialog',
    },
    className: {
      control: false,
      description: 'Class Name to extend styles',
    },
    title: {
      control: { type: 'text' },
      description: 'title for Modal Dialog',
    },
    trigger: {
      control: false,
      description: 'The component for accept Modal Dialog',
    },
  },
  component: Dialog,
  parameters: {
    docs: {
      description: {
        component:
          'The Dialog component provides a flexible dialog box functionality in React, utilizing Radix for styling and behavior. It supports features like a customizable title, trigger element, and children content, making it easy to create interactive dialog interfaces with ease.',
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'shared/Dialog',
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const WithTitle: Story = {
  args: {
    children: (
      <div style={{ padding: '12px 24px' }}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis autem provident voluptate,
        reiciendis maiores tempora laborum quisquam sunt impedit officiis expedita a facere atque
        sit voluptatibus illum ipsum, placeat vel.
      </div>
    ),
    title: 'Modal Dialog',
    trigger: (
      <button style={{ backgroundColor: 'white', border: '1px solid black', color: 'black' }}>
        I am a trigger
      </button>
    ),
  },
}

export const WithoutTitle: Story = {
  args: {
    children: (
      <div style={{ padding: '12px 24px' }}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis autem provident voluptate,
        reiciendis maiores tempora laborum quisquam sunt impedit officiis expedita a facere atque
        sit voluptatibus illum ipsum, placeat vel.
      </div>
    ),
    trigger: (
      <button style={{ backgroundColor: 'white', border: '1px solid black', color: 'black' }}>
        I am a trigger
      </button>
    ),
  },
}

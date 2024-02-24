import { Meta, StoryObj } from '@storybook/react'

import { SignUpForm } from './SignUpForm'

const meta = {
  argTypes: {
    disabled: {
      description: 'Disabled for form component',
    },
    onSubmit: {
      action: 'Form Submit',
      description: 'Form returned object with form fields',
    },
  },
  component: SignUpForm,
  parameters: {
    docs: {
      description: {
        component: 'The Sign Up component for user registration.',
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'feature/Auth/SignUpForm',
} satisfies Meta<typeof SignUpForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

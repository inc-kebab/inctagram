import type { Meta, StoryObj } from '@storybook/react'

import { SignInForm } from './SignInForm'

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
  component: SignInForm,
  parameters: {
    docs: {
      description: {
        component: 'The Sign In component for user login.',
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'feature/Auth/SignInForm',
} satisfies Meta<typeof SignInForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    hrefGithub: '#',
    hrefGoogle: '#',
  },
}

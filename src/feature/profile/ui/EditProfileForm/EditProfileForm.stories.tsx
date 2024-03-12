import type { Meta, StoryObj } from '@storybook/react'

import { EditProfileForm } from './EditProfileForm'

const meta = {
  argTypes: {
    disabled: {
      description: 'Flag for disabled fields & buttons when form is submitted',
    },
    onSubmit: {
      action: 'Profile updated',
      description: 'Callback for submit form',
    },
    userData: {
      description: 'Current user data (if have)',
    },
  },
  component: EditProfileForm,
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
        component: 'Form for update user data',
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'feature/Profile/EditProfileForm',
} satisfies Meta<typeof EditProfileForm>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const Completed: Story = {
  args: {
    userData: {
      aboutMe: 'About me description',
      avatars: null,
      birthDate: '01-01-2000',
      city: 'Arzamas',
      createdAt: '',
      firstname: 'John',
      id: 1,
      lastname: 'Smith',
      username: 'johnthebestname12',
    },
  },
}

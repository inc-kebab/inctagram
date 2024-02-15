import type { Meta, StoryObj } from '@storybook/react'

import { BackToPage } from './BackToPage'

const meta = {
  argTypes: {
    className: {
      control: false,
      description: 'To redefine or set new styles',
    },
    onNavigate: {
      action: 'Navigate to some page',
      description: 'Navigate function. Example: () => router.back()',
    },
    title: {
      description: 'Visible title for component',
    },
  },
  component: BackToPage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'shared/BackToPage',
} satisfies Meta<typeof BackToPage>

export default meta

type Story = StoryObj<typeof meta>

export const WithTitle: Story = {
  args: {
    title: 'Back to Sign Up',
  },
}

export const WithoutTitle: Story = {}

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
    docs: {
      description: {
        component:
          'BackToPage is a "Back" button designed for navigating back to the previous page. It accepts style classes, an onNavigate callback function, and a title. Visually includes an arrow and a title if provided.',
      },
    },
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

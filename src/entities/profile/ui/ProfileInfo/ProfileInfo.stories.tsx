import type { Meta, StoryObj } from '@storybook/react'

import { ProfileInfo } from './ProfileInfo'

const meta = {
  argTypes: {},
  component: ProfileInfo,
  parameters: {
    layout: 'fullscreen', //change
  },
  title: 'components/ProfileInfo', //change
} satisfies Meta<typeof ProfileInfo>

export default meta

type Story = StoryObj<typeof meta>

export const Demo: Story = {
  args: {},
}

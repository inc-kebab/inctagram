import type { Meta, StoryObj } from '@storybook/react'

import { PostPreviewCard } from './PostPreviewCard'

const meta = {
  argTypes: {},
  component: PostPreviewCard,
  parameters: {
    layout: 'centered',
  },
  title: 'entities/Post/PostPreviewCard',
} satisfies Meta<typeof PostPreviewCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    description: '',
    imageSrc: 'https://static.fotogora.ru/fotogora/wysiwyg/2023/09/31.jpg',
  },
}

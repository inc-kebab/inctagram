import type { Meta, StoryObj } from '@storybook/react'

import { PostPreviewCard } from './PostPreviewCard'

const meta = {
  argTypes: {
    description: {
      control: false,
      description: '"Alt" attribute for image',
    },
    imageSrc: {
      control: false,
      description: 'Path for the image',
    },
  },
  component: PostPreviewCard,
  parameters: {
    docs: {
      description: {
        component: 'Component for rendering previews for a post on a profile page.',
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
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

import type { Meta, StoryObj } from '@storybook/react'

import { PostItem } from '@/entities/post'

import { PostsList } from './PostsList'

const meta = {
  argTypes: {},
  component: PostsList,
  parameters: {
    layout: 'centered',
  },
  title: 'entities/Post/PostsList',
} satisfies Meta<typeof PostsList>

export default meta

type Story = StoryObj<typeof meta>

const createMockPost = (imgUrl: string, id: number) => ({
  avatarOwner: '',
  createdAt: '',
  description: 'description',
  id,
  images: [
    {
      fileSize: 300,
      height: 300,
      uploadId: '',
      url: imgUrl,
      width: 300,
    },
  ],
  location: 'location',
  owner: {
    firstName: 'firstName',
    lastName: 'lastName',
  },
  ownerId: 1,
  updatedAt: '',
  username: 'Alex',
})

const posts: PostItem[] = [
  createMockPost('/assets/images/mockPost/1.jpg', 1),
  createMockPost('/assets/images/mockPost/2.jpg', 2),
  createMockPost('/assets/images/mockPost/3.jpg', 3),
  createMockPost('/assets/images/mockPost/4.jpg', 4),
  createMockPost('/assets/images/mockPost/5.jpg', 5),
  createMockPost('/assets/images/mockPost/6.jpg', 6),
  createMockPost('/assets/images/mockPost/7.jpg', 7),
  createMockPost('/assets/images/mockPost/7.jpg', 8),
  createMockPost('/assets/images/mockPost/7.jpg', 9),
  createMockPost('/assets/images/mockPost/7.jpg', 10),
]

export const Default: Story = {
  args: {
    list: posts,
  },
}

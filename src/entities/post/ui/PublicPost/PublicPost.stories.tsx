import type { Meta, StoryObj } from '@storybook/react'

import { PostItem } from '@/entities/post'

import { PublicPost } from './PublicPost'

const meta = {
  argTypes: {},
  component: PublicPost,
  parameters: {
    layout: 'centered',
  },
  title: 'entities/Post/PublicPost',
} satisfies Meta<typeof PublicPost>

export default meta

type Story = StoryObj<typeof meta>

const createMockPost = (): PostItem => ({
  avatarOwner:
    'https://storage.yandexcloud.net/kebab-inctagram/media/users/29/avatars/29-1712160684382-avatar-thumbnail.webp',
  createdAt: '2024-04-12T18:29:31.394Z',
  description:
    "Used by some of the world's largest companies, Next.js enables you to create high-quality web applications with the power of React components.Used by some of the world's largest companies, Next.js enables you to create high-quality web applications with the power of React components.Used by some of the world's largest companies, Next.js enables you to create high-quality web applications with the power of React components.",
  id: 251,
  images: [
    {
      fileSize: 20516,
      height: 617,
      uploadId: '66197d89cbae5ce85e589101',
      url: 'https://storage.yandexcloud.net/kebab-inctagram/media/users/29/posts/29-1712946569650.webp',
      width: 681,
    },
    {
      fileSize: 19152,
      height: 614,
      uploadId: '66197d8acbae5ce85e589103',
      url: 'https://storage.yandexcloud.net/kebab-inctagram/media/users/29/posts/29-1712946570019.webp',
      width: 668,
    },
    {
      fileSize: 18344,
      height: 624,
      uploadId: '66197d8acbae5ce85e589105',
      url: 'https://storage.yandexcloud.net/kebab-inctagram/media/users/29/posts/29-1712946570280.webp',
      width: 672,
    },
  ],
  location: 'location',
  owner: {
    firstname: 'Wayne',
    lastname: 'Bruce',
  },
  ownerId: 29,
  updatedAt: '2024-04-12T18:29:31.394Z',
  username: 'Batman',
})

export const Default: Story = {
  args: {
    handleClick: () => console.log('click'),
    post: createMockPost(),
  },
}

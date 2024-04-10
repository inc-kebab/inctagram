import { Image, PostItem } from '@/entities/post'

export interface GetPostsResponse {
  cursor: number
  hasMore: boolean
  items: PostItem[]
  pageSize: number
  pagesCount: number
  totalCount: number
}

export type GetPublicPostsResponse = {
  userId: number
} & GetPostsResponse

export interface GetPostsArgs {
  cursor?: number
  pageSize?: number
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
}

export type GetAllPostsArgs = GetPostsArgs & { userId: number }

export type DeletePostArgs = {
  id: number
}

export type EditPostArgs = {
  description: string
  id: number
}

export type AddImagesResponse = {
  images: Image[]
}

export type CreatePostResponse = PostItem

export type CreatePostArgs = {
  description: string
  images: string[]
}

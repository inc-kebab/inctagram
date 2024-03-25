import { PostItem } from '@/entities/post'

export interface GetMyPostsResponse {
  cursor: number
  items: PostItem[]
  pageSize: number
  pagesCount: number
  totalCount: number
}

export type DeleteArgs = {
  id: number
}

export type EditPostArgs = {
  description?: string
  id: number
}

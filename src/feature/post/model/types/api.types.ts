import { PostItem } from '@/entities/post'

export interface GetMyPostsResponse {
  cursor: number
  items: PostItem[]
  pageSize: number
  pagesCount: number
  totalCount: number
}

export interface GetMyPostsArgs {
  cursor?: number
  pageSize?: number
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
}

export type DeletePostArgs = {
  id: number
}

export type EditPostArgs = {
  description?: Nullable<string>
  id: number
}

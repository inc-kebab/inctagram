import { PostItem } from '@/entities/post'

export interface GetMyPostsResponse {
  cursor: number
  items: PostItem[]
  pageSize: number
  pagesCount: number
  totalCount: number
}

export type DeletePostArgs = {
  id: number
}

export type EditPostArgs = {
  description?: Nullable<string>
  id: number
}

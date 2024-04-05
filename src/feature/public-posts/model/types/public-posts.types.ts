interface ownerItem {
  firstname: Nullable<string>
  lastname: Nullable<string>
}

interface imagesItem {
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}

export interface PostItem {
  avatarOwner: string
  createdAt: string
  description: Nullable<string>
  id: number
  images: Array<imagesItem>
  location: string
  owner: ownerItem
  ownerId: number
  updatedAt: string
  username: string
}

export interface GetPublicPostsResponse {
  cursor: number
  hasMore: boolean
  items: Array<PostItem>
  pageSize: number
  pagesCount: number
  totalCount: number
}

export interface GetPublicPostsArgs {
  cursor?: number
  pageSize?: number
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
}

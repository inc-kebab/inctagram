export type GetPostsResponse = {
  cursor: number
  items: Item[]
  pageSize: number
  pagesCount: number
  totalCount: number
}

type Item = {
  avatarOwner: string
  createdAt: string
  description: string
  id: number
  images: Image[]
  location: string
  owner: Owner
  ownerId: number
  updatedAt: string
  username: string
}

type Image = {
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}

type Owner = {
  firstName: string
  lastName: string
}

export type PostsParams = {
  cursor?: string
  pageSize?: number
  sortBy?: string
  sortDirection?: string
} | null

export type AddImagesResponse = {
  images: Image[]
}

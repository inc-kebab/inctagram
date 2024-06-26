import { FilterImage } from '@/shared/helpers'

export type FilterPost = {
  name: string
  value: FilterImage
}

export interface Owner {
  firstname: string
  lastname: string
}

export interface Image {
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}

export interface PostItem {
  avatarOwner: Nullable<string>
  createdAt: string
  description: Nullable<string>
  id: number
  images: Image[]
  location: Nullable<string>
  owner: Owner
  ownerId: number
  updatedAt: string
  username: string
}

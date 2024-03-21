export type DeleteArgs = {
  id: number
}

export interface ownerItem {
  firstName: string
  lastName: string
}

export interface ImagesItem {
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}

export interface PostItem {
  avatarOwner: string
  createdAt: string
  description: string
  id: number
  images: Array<ImagesItem>
  location: string
  owner: ownerItem
  ownerId: number
  updatedAt: string
  username: string
}

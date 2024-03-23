export interface Owner {
  firstName: string
  lastName: string
}

export interface Image {
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}

export interface PostItem {
  avatarOwner: string
  createdAt: string
  description: Nullable<string> //? check
  id: number
  images: Image[]
  location: Nullable<string> //? check
  owner: Owner
  ownerId: number
  updatedAt: string
  username: string
}

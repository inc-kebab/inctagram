type CroppedAreaPixels = {
  height: number
  width: number
  x: number
  y: number
}

export type ImageObj = {
  aspect: number
  croppedAreaPixels?: CroppedAreaPixels
  imageURL: string
  uploadId?: string
}

export type ImageObjWithFilter = ImageObj & {
  filter: string
}

export type PostsState = {
  images: ImageObjWithFilter[]
}

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

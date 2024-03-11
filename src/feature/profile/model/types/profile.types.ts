export interface ThumbnailItem {
  fileSize: number
  height: number
  url: string
  width: number
}

export type Avatar = {
  fileSize: number
  height: number
  url: string
  width: number
}

export interface AvatarItem {
  fileSize: number
  height: number
  url: string
  width: number
}

export interface AddAvatarResponse {
  avatar: AvatarItem
  thumbnail: ThumbnailItem
}

export type CroppedArea = {
  height: number
  width: number
  x: number
  y: number
}

export type Avatars = {
  avatar: Avatar
  thumbnail: Thumbnail
}

export type GetProfileResponse = {
  aboutMe: string
  avatars: Avatars
  city: string
  createdAt: string
  dateOfBirth: string
  firstName: string
  id: number
  lastName: string
  username: string
}
export type UpdateProfileArgs = {
  aboutMe?: string
  birthDate: string
  city?: string
  firstname: string
  lastname: string
  username: string
}

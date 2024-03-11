export type Avatar = {
  fileSize: number
  height: number
  url: string
  width: number
}

export type Thumbnail = {
  fileSize: number
  height: number
  url: string
  width: number
}

export type Avatars = {
  avatar: Avatar
  thumbnail: Thumbnail
}

export type GetProfileResponse = {
  aboutMe: null | string
  avatars: Avatars
  birthDate: null | string
  city: null | string
  createdAt: string
  firstName: null | string
  id: number
  lastName: null | string
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

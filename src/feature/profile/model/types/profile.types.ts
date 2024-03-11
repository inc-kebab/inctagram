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
  aboutMe: string
  avatars: Avatars
  city: string
  createdAt: string
  dateOfBirth: string
  firstName: string
  id: number
  lastName: string
  userName: string
}
export type UpdateProfileArgs = {
  aboutMe?: string
  birthDate: string
  city?: string
  firstname: string
  lastname: string
  username: string
}

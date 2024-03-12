export type Avatar = {
  fileSize: number
  height: number
  url: string
  width: number
}

export type CroppedArea = {
  height: number
  width: number
  x: number
  y: number
}

export type AddAvatarResponse = {
  avatar: Avatar | null
  thumbnail: Avatar | null
}

export type GetProfileResponse = {
  aboutMe: null | string
  avatars: AddAvatarResponse | null
  birthDate: string
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

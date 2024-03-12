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
  'avatar-medium': Avatar | null
  'avatar-thumbnail': Avatar | null
}

export type GetProfileResponse = {
  aboutMe: null | string
  avatars: AddAvatarResponse | null
  birthDate: string
  city: null | string
  createdAt: string
  firstname: null | string
  id: number
  lastname: null | string
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

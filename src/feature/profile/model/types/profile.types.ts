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
  aboutMe: string
  avatars: AddAvatarResponse | null
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

export type Avatar = {
  fileSize: number
  height: number
  url: string
  width: number
}

export type AddAvatarResponse = {
  'avatar-medium': Nullable<Avatar>
  'avatar-thumbnail': Nullable<Avatar>
}

export type GetProfileResponse = {
  aboutMe: Nullable<string>
  avatars: Nullable<AddAvatarResponse>
  birthDate: string
  city: Nullable<string>
  createdAt: string
  firstname: Nullable<string>
  id: number
  lastname: Nullable<string>
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

export interface GetTotalUsersResponse {
  lastUserId: number
  totalUsersCount: number
}

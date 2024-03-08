export interface ThumbnailItem {
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

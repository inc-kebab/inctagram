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

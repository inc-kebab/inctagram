import { Point } from 'react-easy-crop'

import { FilterImage } from '@/shared/helpers'

export type CurrentWindow = 'description' | 'expand' | 'filter' | 'upload' | null

export type ImageURL = {
  imageURL: string
}

type ImageOptions = {
  aspect: number
  crop: Point
  croppedAreaPixels: Nullable<CroppedArea>
  uploadId: Nullable<string>
  zoom: number
}

export type ImageObj = ImageURL & ImageOptions

export type UpdateImageModel = ImageURL & Partial<ImageObj>

export type CroppedImage = ImageURL & { filter: FilterImage }

export type PostsState = {
  croppedImages: CroppedImage[]
  images: ImageObj[]
  imagesWithFilters: ImageURL[]
  window: CurrentWindow
}

export type DraftPost = {
  croppedImages: Blob[]
  id: 'draft_post'
  images: Blob[]
  imagesWithFilters: Blob[]
  window: CurrentWindow
}

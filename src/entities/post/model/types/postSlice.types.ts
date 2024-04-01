import { Point } from 'react-easy-crop'

import { FilterImage } from '@/shared/helpers/getModifiedImage'

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
}

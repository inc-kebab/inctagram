import { FilterImage } from '@/shared/helpers'

export type AdditionalRefProps = {
  isDirty: boolean
}

export type CurrentWindow = 'description' | 'expand' | 'filter' | 'upload'

export type CurrentWindowMobile = 'description' | 'expand' | 'upload'

export type FilterPost = {
  name: string
  value: FilterImage
}

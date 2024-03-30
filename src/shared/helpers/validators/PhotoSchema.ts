import { LocaleType } from '@/../locales'
import { z } from 'zod'

export const ALLOWED_IMAGES_FORMATS = ['image/jpeg', 'image/jpg', 'image/png']
export const MAX_SIZE_IMAGE = 10485760

export const PhotoSchema = (t: LocaleType) => {
  return z
    .instanceof(File)
    .refine(file => file.size <= MAX_SIZE_IMAGE, t.validation.avatarSize)
    .refine(file => ALLOWED_IMAGES_FORMATS.includes(file.type), t.validation.avatarType)
}

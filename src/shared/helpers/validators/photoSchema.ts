import { LocaleType } from '@/../locales'
import { z } from 'zod'

export const ALLOWED_IMAGES_FORMATS = ['image/jpeg', 'image/jpg', 'image/png']

export const photoSchema = (t: LocaleType, maxSize = 10485760) => {
  return z
    .instanceof(File)
    .refine(file => file.size <= maxSize, t.validation.avatarSize(maxSize / 1024 / 1024)) // convert to Mb
    .refine(file => ALLOWED_IMAGES_FORMATS.includes(file.type), t.validation.avatarType)
}

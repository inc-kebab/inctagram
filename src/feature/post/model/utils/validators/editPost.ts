import { LocaleType } from '@/../locales'
import { z } from 'zod'

export const editPostSchema = (t: LocaleType) => {
  return z.object({
    description: z.string().trim().max(200, t.validation.maxLength(200)),
  })
}

export type EditPostFormValues = z.infer<ReturnType<typeof editPostSchema>>

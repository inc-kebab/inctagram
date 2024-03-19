import { LocaleType } from '@/../locales'
import { z } from 'zod'

export const editPostSchema = (t: LocaleType) => {
  return z.object({
    description: z.string().trim().max(500, t.validation.maxLength(500)),
  })
}

export type EditPostFormValues = z.infer<ReturnType<typeof editPostSchema>>

import { LocaleType } from '@/../locales'
import { z } from 'zod'

export type ForgotPasswordFormValues = z.infer<ReturnType<typeof forgotPasswordSchema>>

export const forgotPasswordSchema = (t: LocaleType) =>
  z.object({
    captcha: z.boolean(),
    email: z.string().trim().min(1, t.validation.required).email(),
  })

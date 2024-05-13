import { LocaleType } from '@/../locales'
import { z } from 'zod'

export const forgotPasswordSchema = (t: LocaleType) =>
  z.object({
    email: z
      .string()
      .trim()
      .min(1, t.validation.required)
      .email({ message: t.validation.emailVerification }),
    recaptcha: z
      .string()
      .nullable()
      .refine(value => value, {
        message: t.validation.required,
      }),
  })

export type ForgotPasswordFormValues = z.infer<ReturnType<typeof forgotPasswordSchema>>

import { LocaleType } from '@/../locales'
import { PASSWORD_PATTERN } from '@/shared/const/regexs'
import { z } from 'zod'

export const signInValidationSchema = (t: LocaleType) =>
  z.object({
    email: z.string().trim().email({ message: t.validation.emailVerification }).default(''),
    password: z
      .string()
      .trim()
      .min(6, t.validation.minLength6)
      .max(20, t.validation.maxLength20)
      .regex(PASSWORD_PATTERN, t.validation.passwordVerification)
      .default(''),
  })

export type SignInFormValues = z.infer<ReturnType<typeof signInValidationSchema>>

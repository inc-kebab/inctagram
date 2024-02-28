import { LocaleType } from '@/../locales'
import { PASSWORD_PATTERN, USERNAME_PATTERN } from '@/shared/const/regexs'
import { z } from 'zod'
export const SignUpSchema = (t: LocaleType) =>
  z
    .object({
      accept: z.boolean().default(false),
      email: z.string().email({ message: t.validation.emailVerification }).default(''),
      password: z
        .string()
        .trim()
        .min(6, t.validation.minLength6)
        .max(20, t.validation.maxLength20)
        .regex(PASSWORD_PATTERN, t.validation.passwordVerification)
        .default(''),
      passwordConfirm: z.string().default(''),
      username: z
        .string()
        .trim()
        .regex(USERNAME_PATTERN, { message: t.validation.userNameVerification })
        .min(6, t.validation.minLength6)
        .max(20, t.validation.maxLength20)
        .default(''),
    })
    .refine(data => data.password === data.passwordConfirm && data.passwordConfirm.length > 0, {
      message: t.validation.passwordMismatch,
      path: ['passwordConfirm'],
    })

export type SignUpSchemaType = z.infer<ReturnType<typeof SignUpSchema>>
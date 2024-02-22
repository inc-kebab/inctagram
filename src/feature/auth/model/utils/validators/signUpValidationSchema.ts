import { LocaleType } from '@/../locales'
import { PASSWORD_PATTERN, USERNAME_PATTERN } from '@/shared/const/regexs'
import { z } from 'zod'
export const SignUpSchema = (t: LocaleType) =>
  z
    .object({
      accept: z.boolean().default(false),
      email: z
        .string()
        .email({ message: 'The email must match the format example@example.com' })
        .default(''),
      password: z
        .string()
        .trim()
        .min(6, t.validation.minLength6)
        .max(30, t.validation.maxLength20)
        .regex(PASSWORD_PATTERN, t.validation.passwordVerification)
        .default(''),
      passwordConfirm: z.string().default(''),
      username: z
        .string()
        .min(6, t.validation.minLength6)
        .max(30, t.validation.maxLength20)
        .regex(USERNAME_PATTERN, { message: 'Not Valid' })
        .default(''),
    })
    .refine(data => data.password === data.passwordConfirm, {
      message: 'The passwords must match',
      path: ['passwordConfirm'],
    })

export type SignUpSchemaType = z.infer<ReturnType<typeof SignUpSchema>>

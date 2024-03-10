import { LocaleType } from '@/../locales'
import { PASSWORD_PATTERN } from '@/shared/const/regexs'
import { z } from 'zod'

export const createNewPasswordSchema = (t: LocaleType) =>
  z
    .object({
      confirmPassword: z.string().default(''),
      password: z
        .string()
        .min(6, t.validation.minLength(6))
        .max(20, t.validation.maxLength(20))
        .regex(PASSWORD_PATTERN, {
          message: t.validation.passwordVerification,
        })
        .default(''),
    })
    .refine(
      ({ confirmPassword, password }) => {
        return confirmPassword === password && confirmPassword.length > 0
      },
      {
        message: t.validation.passwordMismatch,
        path: ['confirmPassword'],
      }
    )

export type CreateNewPasswordFormValues = z.infer<ReturnType<typeof createNewPasswordSchema>>

import { PASSWORD_PATTERN } from '@/shared/const/regexs'
import { z } from 'zod'

export const createNewPasswordSchema = z
  .object({
    confirmPassword: z.string().default(''),
    password: z
      .string()
      .min(6, 'Minimum 6 characters for password')
      .max(20, 'Maximum 20 characters for password')
      .regex(PASSWORD_PATTERN, {
        message:
          'Password must contain a-z, A-Z,  ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~',
      })
      .default(''),
  })
  .refine(
    ({ confirmPassword, password }) => {
      return confirmPassword === password && confirmPassword.length > 0
    },
    {
      message: 'The passwords must match',
      path: ['confirmPassword'],
    }
  )

export type CreateNewPasswordFormValues = z.infer<typeof createNewPasswordSchema>

import { z } from 'zod'

export const createNewPasswordSchema = z
  .object({
    confirmPassword: z.string().default(''),
    password: z
      .string()
      .min(6, 'Minimum 6 characters for password')
      .max(20, 'Maximum 20 characters for password')
      .refine(
        value =>
          /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,-.\\/:;<=>?@[\]^_`{|}~])[A-Za-z0-9!"#$%&'()*+,-.\\/:;<=>?@[\]^_`{|}~]+$/.test(
            value
          ),
        {
          message:
            'Password must contain a-z, A-Z,  ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~',
        }
      )
      .default(''),
  })
  .refine(
    ({ confirmPassword, password }) => {
      if (password.length > 0) {
        return confirmPassword === password
      }

      return true
    },
    {
      message: 'The passwords must match',
      path: ['confirmPassword'],
    }
  )

export type CreateNewPasswordFormValues = z.infer<typeof createNewPasswordSchema>

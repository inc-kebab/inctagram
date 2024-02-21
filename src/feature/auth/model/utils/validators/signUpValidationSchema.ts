import { PASSWORD_PATTERN, USERNAME_PATTERN } from '@/shared/const/regexs'
import { z } from 'zod'
export const SignUpSchema = z
  .object({
    accept: z.boolean().default(false),
    email: z
      .string()
      .email({ message: 'The email must match the format example@example.com' })
      .default(''),
    password: z
      .string()
      .trim()
      .min(6, { message: 'Minimum number of characters 6' })
      .max(30, { message: 'Maximum number of characters 30' })
      // .regex(PASSWORD_PATTERN, {
      //   message:
      //     "Password must contain a-z, A-Z,  ! \" # $ % & ' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ ` { | } ~',",
      // })
      .default(''),
    passwordConfirm: z.string().default(''),
    username: z
      .string()
      .min(6, { message: 'Minimum number of characters 6' })
      .max(30, { message: 'Maximum number of characters 30' })
      .regex(USERNAME_PATTERN, { message: 'Not Valid' })
      .default(''),
  })
  .refine(data => data.password === data.passwordConfirm, {
    message: 'The passwords must match',
    path: ['passwordConfirm'],
  })

export type SignUpSchemaType = z.infer<typeof SignUpSchema>

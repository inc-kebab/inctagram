import { z } from 'zod'

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>

export const emailValidation = z.string().trim().min(1, 'Required').email()

export const forgotPasswordSchema = z.object({
  captcha: z.boolean(),
  email: emailValidation,
})

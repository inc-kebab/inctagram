import { SubmitHandler } from 'react-hook-form'

import { z } from 'zod'

import { forgotPasswordSchema } from '../utils/validators/forgotPasswordValidationSchema'

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>

export type ForgotPasswordProps = {
  onSubmit: SubmitHandler<ForgotPasswordFormValues>
}

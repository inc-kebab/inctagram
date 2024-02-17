import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { ForgotPasswordFormValues } from '../../model/types'
import { forgotPasswordSchema } from '../../model/utils/validators/forgotPasswordValidationSchema'

export const useForgotPasswordForm = () =>
  useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  })

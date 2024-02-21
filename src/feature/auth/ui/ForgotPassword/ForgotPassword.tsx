import { SubmitHandler, useForm } from 'react-hook-form'

import { Recaptcha } from '@/shared/assets/icons/other'
import { Button } from '@/shared/ui/Button'
import { Card } from '@/shared/ui/Card'
import { Typography } from '@/shared/ui/Typography'
import { ControlledCheckbox } from '@/shared/ui_controlled/ControlledCheckbox'
import { ControlledTextField } from '@/shared/ui_controlled/ControlledTextField'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'

import s from './ForgotPassword.module.scss'

import {
  ForgotPasswordFormValues,
  forgotPasswordSchema,
} from '../../model/utils/validators/forgotPasswordValidationSchema'

export type ForgotPasswordProps = {
  disabled?: boolean
  onSubmit: SubmitHandler<ForgotPasswordFormValues>
}
export const ForgotPasswordForm = ({ disabled, onSubmit }: ForgotPasswordProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className={s.card}>
        <Typography className={s.title} textAlign="center" variant="h1">
          Forgot Password
        </Typography>
        <ControlledTextField
          className={s.textField}
          control={control}
          disabled={disabled}
          label="Email"
          name="email"
        />
        <Typography className={s.description} variant="regular14">
          Enter your email address and we will send you further instructions
        </Typography>
        <Button className={s.button} disabled={disabled} fullWidth type="submit">
          Send Link
        </Button>
        <Button
          asComponent={Link}
          className={s.link}
          href="/auth/sign-in"
          type="button"
          variant="text"
        >
          Back to Sign In
        </Button>
        <Card className={s.recaptcha}>
          <ControlledCheckbox
            control={control}
            disabled={disabled}
            label="I’m not a robot"
            name="captcha"
          />
          <Recaptcha />
        </Card>
      </Card>
    </form>
  )
}

import { useForm } from 'react-hook-form'

import { Recaptcha } from '@/shared/assets/icons/other'
import { useTranslation } from '@/shared/hooks/useTranslation'
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
  onSubmit: (values: ForgotPasswordFormValues) => void
}
export const ForgotPasswordForm = ({ disabled, onSubmit }: ForgotPasswordProps) => {
  const { t } = useTranslation()
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema(t)),
  })

  return (
    <Card asComponent="form" className={s.card} onSubmit={handleSubmit(onSubmit)}>
      <Typography textAlign="center" variant="h1">
        {t.pages.forgotPassword.title}
      </Typography>
      <ControlledTextField
        className={s.textField}
        control={control}
        disabled={disabled}
        label={t.label.email}
        name="email"
        type="email"
      />
      <Typography className={s.description} variant="regular14">
        {t.pages.forgotPassword.description}
      </Typography>
      <Button className={s.button} disabled={disabled} fullWidth type="submit">
        {t.button.sendLink}
      </Button>
      <Button
        asComponent={Link}
        className={s.link}
        href="/auth/sign-in"
        type="button"
        variant="text"
      >
        {t.button.backToSignIn}
      </Button>
      <Card className={s.recaptcha}>
        <ControlledCheckbox
          control={control}
          disabled={disabled}
          label={t.label.reCaptcha}
          name="captcha"
        />
        <Recaptcha />
      </Card>
    </Card>
  )
}

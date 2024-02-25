import { ComponentPropsWithoutRef } from 'react'
import { useForm } from 'react-hook-form'

import { Github, Google } from '@/shared/assets/icons/other'
import { AuthRoutes } from '@/shared/const/routes'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Button } from '@/shared/ui/Button'
import { Card } from '@/shared/ui/Card'
import { Typography } from '@/shared/ui/Typography'
import { ControlledTextField } from '@/shared/ui_controlled/ControlledTextField'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import Link from 'next/link'

import s from './SignInForm.module.scss'

import {
  SignInFormValues,
  signInValidationSchema,
} from '../../model/utils/validators/signInValidationSchema'

type SignInFormProps = {
  disabled?: boolean
  error?: string
  onSubmit: (data: SignInFormValues) => void
} & Omit<ComponentPropsWithoutRef<'form'>, 'onSubmit'>

export const SignInForm = ({ className, disabled, error, onSubmit }: SignInFormProps) => {
  const { t } = useTranslation()

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<SignInFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(signInValidationSchema(t)),
  })

  return (
    <Card asComponent="form" className={clsx(s.card, className)} onSubmit={handleSubmit(onSubmit)}>
      <Typography asComponent="h1" className={s.formName} textAlign="center" variant="h1">
        {t.pages.signIn.title}
      </Typography>
      <div className={s.formNetwork}>
        <Button className={s.networkLink} variant="text">
          <Google />
        </Button>
        <Button className={s.networkLink} variant="text">
          <Github />
        </Button>
      </div>
      <ControlledTextField
        className={s.input}
        control={control}
        disabled={disabled}
        error={errors.email?.message ?? error}
        label={t.label.email}
        name="email"
        rules={{ required: true }}
        type="email"
      />
      <ControlledTextField
        className={s.input}
        control={control}
        disabled={disabled}
        error={errors.password?.message ?? error}
        label={t.label.password}
        name="password"
        rules={{ required: true }}
        type="password"
      />
      <Typography
        asComponent={Link}
        className={s.forgotPassword}
        href={AuthRoutes.FORGOT_PASSWORD}
        textAlign="end"
        variant="regular14"
      >
        {t.pages.signIn.forgotPassword}
      </Typography>
      <Button className={s.signInButton} disabled={disabled || !isValid} fullWidth>
        {t.button.signIn}
      </Button>
      <Typography className={s.signUpSuggestion} textAlign="center">
        {t.pages.signIn.signUpSuggestion}
      </Typography>
      <Button
        asComponent={Link}
        className={s.signUpButton}
        fullWidth
        href={AuthRoutes.SIGN_UP}
        variant="text"
      >
        {t.button.signUp}
      </Button>
    </Card>
  )
}

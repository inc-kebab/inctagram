import { ComponentPropsWithoutRef, Ref, forwardRef, useImperativeHandle } from 'react'
import { useForm } from 'react-hook-form'

import { useTranslation } from '@/shared/hooks/useTranslation'
import { UseFormRef } from '@/shared/types/form'
import { Button } from '@/shared/ui/Button'
import { Card } from '@/shared/ui/Card'
import { Typography } from '@/shared/ui/Typography'
import { ControlledTextField } from '@/shared/ui_controlled/ControlledTextField'
import { Recaptcha } from '@/widgets/recaptcha'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import Link from 'next/link'

import s from './ForgotPasswordForm.module.scss'

import {
  ForgotPasswordFormValues,
  forgotPasswordSchema,
} from '../../model/utils/validators/forgotPasswordValidationSchema'

export type ForgotPasswordProps = {
  disabled?: boolean
  onSubmit: (data: ForgotPasswordFormValues) => void
  success?: boolean
} & Omit<ComponentPropsWithoutRef<'form'>, 'onSubmit'>

export const ForgotPasswordForm = forwardRef(
  (
    { className, disabled, onSubmit, success, ...rest }: ForgotPasswordProps,
    ref: Ref<UseFormRef<ForgotPasswordFormValues>>
  ) => {
    const { t } = useTranslation()

    const {
      control,
      formState: { errors, isValid },
      getValues,
      handleSubmit,
      reset,
      setError,
    } = useForm<ForgotPasswordFormValues>({
      defaultValues: {
        email: '',
        recaptcha: '',
      },
      mode: 'onTouched',
      resolver: zodResolver(forgotPasswordSchema(t)),
    })

    useImperativeHandle(ref, () => ({
      email: getValues('email'),
      recaptcha: getValues('recaptcha'),
      reset,
      setError,
    }))

    return (
      <Card
        asComponent="form"
        className={clsx(s.card, className)}
        onSubmit={handleSubmit(onSubmit)}
        {...rest}
      >
        <Typography textAlign="center" variant="h1">
          {t.pages.forgotPassword.title}
        </Typography>
        <ControlledTextField
          className={s.textField}
          control={control}
          disabled={disabled || success}
          error={errors?.email?.message}
          label={t.label.email}
          name="email"
          type="email"
        />
        <Typography className={s.description} variant="regular14">
          {t.pages.forgotPassword.description}
        </Typography>
        {success && (
          <Typography className={s.success} variant="regular14">
            {t.pages.forgotPassword.success}
          </Typography>
        )}
        <Button className={s.button} disabled={disabled || !isValid} fullWidth type="submit">
          {success ? t.button.sendLinkAgain : t.button.sendLink}
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
        {!success && (
          <Recaptcha control={control} error={errors.recaptcha?.message} name="recaptcha" />
        )}
      </Card>
    )
  }
)

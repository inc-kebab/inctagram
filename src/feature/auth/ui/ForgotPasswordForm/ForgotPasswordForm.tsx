import { ComponentPropsWithoutRef, ReactNode, Ref, forwardRef, useImperativeHandle } from 'react'
import { UseFormReset, UseFormSetError, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { useTranslation } from '@/shared/hooks/useTranslation'
import { Button } from '@/shared/ui/Button'
import { Card } from '@/shared/ui/Card'
import { Typography } from '@/shared/ui/Typography'
import { ControlledTextField } from '@/shared/ui_controlled/ControlledTextField'
import { Recaptcha } from '@/widgets/recaptcha/ui/Recaptcha/Recaptcha'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import Link from 'next/link'

import style from '../../../../pages/auth/forgot-password/ForgotPassword.module.scss'
import s from './ForgotPasswordForm.module.scss'

import {
  ForgotPasswordFormValues,
  forgotPasswordSchema,
} from '../../model/utils/validators/forgotPasswordValidationSchema'
import success = toast.success

export type ForgotPasswordProps = {
  disabled?: boolean
  onSubmit: (data: ForgotPasswordFormValues) => void
  success?: boolean
} & Omit<ComponentPropsWithoutRef<'form'>, 'onSubmit'>

export type RefType = {
  reset: UseFormReset<ForgotPasswordFormValues>
  setError: UseFormSetError<ForgotPasswordFormValues>
}
export const ForgotPasswordForm = forwardRef(
  ({ disabled, onSubmit, success }: ForgotPasswordProps, ref: Ref<RefType>) => {
    const { t } = useTranslation()
    const {
      control,
      formState: { errors, isValid },
      handleSubmit,
      reset,
      setError,
    } = useForm<ForgotPasswordFormValues>({
      defaultValues: {
        email: '',
        recaptcha: '',
      },
      mode: 'onBlur',
      resolver: zodResolver(forgotPasswordSchema(t)),
    })

    useImperativeHandle(ref, () => ({ reset, setError }))

    return (
      <Card
        asComponent="form"
        className={clsx(s.card, style.block)}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography textAlign="center" variant="h1">
          {t.pages.forgotPassword.title}
        </Typography>
        <ControlledTextField
          className={s.textField}
          control={control}
          disabled={disabled}
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
        <Recaptcha control={control} error={errors.recaptcha?.message} name="recaptcha" />
      </Card>
    )
  }
)

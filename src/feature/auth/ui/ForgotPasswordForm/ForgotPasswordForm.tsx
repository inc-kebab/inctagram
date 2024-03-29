import { ComponentPropsWithoutRef, Ref, forwardRef, useImperativeHandle } from 'react'
import { useForm } from 'react-hook-form'

import { AuthRoutes } from '@/shared/const/routes'
import { useFormRevalidateWithLocale } from '@/shared/hooks/useFormRevalidateWithLocale'
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
  isError?: boolean
  isSuccess?: boolean
  onSubmit: (data: ForgotPasswordFormValues) => void
} & Omit<ComponentPropsWithoutRef<'form'>, 'onSubmit'>

export const ForgotPasswordForm = forwardRef(
  (
    { className, disabled, isError, isSuccess, onSubmit, ...rest }: ForgotPasswordProps,
    ref: Ref<UseFormRef<ForgotPasswordFormValues>>
  ) => {
    const { locale, t } = useTranslation()

    const {
      control,
      formState: { errors, isValid },
      getValues,
      handleSubmit,
      reset,
      setError,
      setValue,
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

    useFormRevalidateWithLocale({ errors, locale, setValue, values: getValues() })

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
          autoComplete="email"
          className={s.textField}
          control={control}
          disabled={disabled || isSuccess}
          error={errors?.email?.message}
          label={t.label.email}
          name="email"
          type="email"
        />
        <Typography className={s.description} variant="regular14">
          {t.pages.forgotPassword.description}
        </Typography>
        {isSuccess && (
          <Typography className={s.success} variant="regular14">
            {t.pages.forgotPassword.success}
          </Typography>
        )}
        <Button
          className={s.button}
          disabled={disabled || !isValid || isError}
          fullWidth
          type="submit"
        >
          {isSuccess ? t.button.sendLinkAgain : t.button.sendLink}
        </Button>
        <Button
          asComponent={Link}
          className={s.link}
          href={AuthRoutes.SIGN_IN}
          type="button"
          variant="text"
        >
          {t.button.backToSignIn}
        </Button>
        {!isSuccess && (
          <Recaptcha
            className={s.recaptcha}
            control={control}
            error={errors.recaptcha?.message}
            isError={isError}
            name="recaptcha"
          />
        )}
      </Card>
    )
  }
)

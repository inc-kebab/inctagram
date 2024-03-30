import {
  ComponentPropsWithoutRef,
  KeyboardEvent,
  Ref,
  forwardRef,
  useImperativeHandle,
} from 'react'
import { useForm } from 'react-hook-form'

import { useFormRevalidateWithLocale } from '@/shared/hooks/useFormRevalidateWithLocale'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { UseFormRef } from '@/shared/types/form'
import { Button } from '@/shared/ui/Button'
import { Card } from '@/shared/ui/Card'
import { Typography } from '@/shared/ui/Typography'
import { ControlledTextField } from '@/shared/ui_controlled/ControlledTextField'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'

import s from './CreateNewPasswordForm.module.scss'

import {
  CreateNewPasswordFormValues,
  createNewPasswordSchema,
} from '../../model/utils/validators/createNewPasswordSchema'

type Props = {
  disabled?: boolean
  onSubmit: (values: CreateNewPasswordFormValues) => void
} & Omit<ComponentPropsWithoutRef<'form'>, 'onSubmit'>

export const CreateNewPasswordForm = forwardRef(
  (
    { className, disabled, onSubmit, ...rest }: Props,
    ref: Ref<UseFormRef<CreateNewPasswordFormValues>>
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
    } = useForm<CreateNewPasswordFormValues>({
      defaultValues: {
        confirmPassword: '',
        password: '',
      },
      mode: 'onTouched',
      resolver: zodResolver(createNewPasswordSchema(t)),
    })

    useImperativeHandle(ref, () => ({ reset, setError }))

    useFormRevalidateWithLocale({ errors, locale, setValue, values: getValues() })

    return (
      <Card
        asComponent="form"
        className={clsx(s.card, className)}
        onSubmit={handleSubmit(onSubmit)}
        {...rest}
      >
        <Typography asComponent="h1" className={s.title} textAlign="center" variant="h1">
          {t.pages.createNewPassword.title}
        </Typography>
        <ControlledTextField
          autoComplete="new-password"
          className={s.firstTextField}
          control={control}
          disabled={disabled}
          error={errors?.password?.message}
          label={t.label.newPassword}
          name="password"
          placeholder={t.placeholders.password}
          type="password"
        />
        <ControlledTextField
          autoComplete="new-password"
          className={s.secondTextField}
          control={control}
          disabled={disabled}
          error={errors?.confirmPassword?.message}
          label={t.label.confirmPassword}
          name="confirmPassword"
          placeholder={t.placeholders.passwordConfirm}
          type="password"
        />
        <Typography className={s.limitations} variant="regular14">
          {t.pages.createNewPassword.description}
        </Typography>
        <Button disabled={disabled || !isValid} fullWidth type="submit">
          {t.button.createNewPassword}
        </Button>
      </Card>
    )
  }
)

import {
  ComponentPropsWithoutRef,
  KeyboardEvent,
  Ref,
  forwardRef,
  useImperativeHandle,
} from 'react'
import { UseFormReset, UseFormSetError, useForm } from 'react-hook-form'

import { useTranslation } from '@/shared/hooks/useTranslation'
import { Button } from '@/shared/ui/Button'
import { Card } from '@/shared/ui/Card'
import { Typography } from '@/shared/ui/Typography'
import { ControlledTextField } from '@/shared/ui_controlled/ControlledTextField'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'

import s from './CreateNewPasswordForm.module.scss'
import style from '@/pages/auth/create-new-password/CreateNewPassword.module.scss'

import {
  CreateNewPasswordFormValues,
  createNewPasswordSchema,
} from '../../model/utils/validators/createNewPasswordSchema'

type Props = {
  disabled?: boolean
  onSubmit: (values: CreateNewPasswordFormValues) => void
} & Omit<ComponentPropsWithoutRef<'form'>, 'onSubmit'>

export type RefType = {
  reset: UseFormReset<CreateNewPasswordFormValues>
  setError: UseFormSetError<CreateNewPasswordFormValues>
}

export const CreateNewPasswordForm = forwardRef(
  ({ disabled, onSubmit }: Props, ref: Ref<RefType>) => {
    const { t } = useTranslation()

    const {
      control,
      formState: { errors, isValid },
      handleSubmit,
      reset,
      setError,
    } = useForm<CreateNewPasswordFormValues>({
      defaultValues: {
        confirmPassword: '',
        password: '',
      },
      mode: 'onBlur',
      resolver: zodResolver(createNewPasswordSchema(t)),
    })

    const onKeydownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleSubmit(onSubmit)()
      }
    }

    useImperativeHandle(ref, () => ({ reset, setError }))

    return (
      <Card
        asComponent="form"
        className={clsx(s.card, style.block)}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography asComponent="h1" className={s.title} textAlign="center" variant="h1">
          {t.pages.createNewPassword.title}
        </Typography>
        <ControlledTextField
          className={s.firstTextField}
          control={control}
          disabled={disabled}
          error={errors?.password?.message}
          label={t.label.newPassword}
          name="password"
          type="password"
        />
        <ControlledTextField
          className={s.secondTextField}
          control={control}
          disabled={disabled}
          error={errors?.confirmPassword?.message}
          label={t.label.confirmPassword}
          name="confirmPassword"
          onKeyDown={onKeydownHandler}
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

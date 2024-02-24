import { KeyboardEvent } from 'react'
import { useForm } from 'react-hook-form'

import { useTranslation } from '@/shared/hooks/useTranslation'
import { Button } from '@/shared/ui/Button'
import { Card } from '@/shared/ui/Card'
import { Typography } from '@/shared/ui/Typography'
import { ControlledTextField } from '@/shared/ui_controlled/ControlledTextField'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './CreateNewPasswordForm.module.scss'

import {
  CreateNewPasswordFormValues,
  createNewPasswordSchema,
} from '../../model/utils/validators/createNewPasswordSchema'

type Props = {
  disabled?: boolean
  onSubmit: (values: CreateNewPasswordFormValues) => void
}

export const CreateNewPasswordForm = ({ disabled, onSubmit }: Props) => {
  const { t } = useTranslation()

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateNewPasswordFormValues>({
    mode: 'onBlur',
    resolver: zodResolver(createNewPasswordSchema(t)),
  })

  const onKeydownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit(onSubmit)()
    }
  }

  return (
    <Card asComponent="form" className={s.card} onSubmit={handleSubmit(onSubmit)}>
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
      <Button disabled={disabled} fullWidth type="submit">
        {t.button.createNewPassword}
      </Button>
    </Card>
  )
}

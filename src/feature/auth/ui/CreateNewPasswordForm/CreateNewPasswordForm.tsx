import { KeyboardEvent } from 'react'
import { useForm } from 'react-hook-form'

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
  onSubmit: (values: CreateNewPasswordFormValues) => void
}

export const CreateNewPasswordForm = ({ onSubmit }: Props) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateNewPasswordFormValues>({
    mode: 'onBlur',
    resolver: zodResolver(createNewPasswordSchema),
  })

  const onKeydownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit(onSubmit)()
    }
  }

  return (
    <Card className={s.card}>
      <Typography asComponent="h1" className={s.title} variant="h1">
        Create New Password
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ControlledTextField
          autoFocus
          className={s.firstTextField}
          control={control}
          defaultValue=""
          error={errors?.password?.message}
          label="New password"
          name="password"
          type="password"
        />
        <ControlledTextField
          className={s.secondTextField}
          control={control}
          defaultValue=""
          error={errors?.confirmPassword?.message}
          label="Password confirmation"
          name="confirmPassword"
          onKeyDown={onKeydownHandler}
          type="password"
        />
        <Typography className={s.limitations} variant="regular14">
          Your password must be between 6 and 20 characters
        </Typography>
        <Button fullWidth type="submit">
          Create new password
        </Button>
      </form>
    </Card>
  )
}

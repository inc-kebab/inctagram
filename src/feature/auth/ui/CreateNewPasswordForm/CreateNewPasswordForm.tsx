import { KeyboardEvent } from 'react'
import { Controller, useForm } from 'react-hook-form'

import {
  CreateNewPasswordFormSchema,
  createNewPasswordSchema,
} from '@/feature/auth/model/sсhemas/createNewPasswordSchema'
import { Button } from '@/shared/ui/Button'
import { Card } from '@/shared/ui/Card'
import { Typography } from '@/shared/ui/Typography'
import { ControlledTextField } from '@/shared/ui_controlled/ControlledTextField'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './CreateNewPasswordForm.module.scss'

type Props = {
  onSubmit: () => void
}

export const CreateNewPasswordForm = ({ onSubmit }: Props) => {
  const { control, handleSubmit } = useForm<CreateNewPasswordFormSchema>({
    resolver: zodResolver(createNewPasswordSchema),
  })

  const onKeydownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit(onSubmit)()
    }
  }

  return (
    <Card className={s.card}>
      <Typography asComponent="h1" variant="h1">
        Create New Password
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="password"
          render={({ field, fieldState: { error } }) => (
            <ControlledTextField
              autoFocus
              className={s.firstTextField}
              control={control}
              error={error?.message}
              label="New password"
              type="password"
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field, fieldState: { error } }) => (
            <ControlledTextField
              className={s.secondTextField}
              control={control}
              error={error?.message}
              label="Password confirmation"
              onKeyDown={onKeydownHandler}
              type="password"
              {...field}
            />
          )}
        />
        <Typography variant="regular14">
          Your password must be between 6 and 20 characters
        </Typography>
        <Button fullWidth type="submit">
          Create new password
        </Button>
      </form>
    </Card>
  )
}

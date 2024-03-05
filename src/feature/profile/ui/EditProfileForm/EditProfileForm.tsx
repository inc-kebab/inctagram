import { ComponentPropsWithoutRef, forwardRef, useImperativeHandle } from 'react'
import { useForm } from 'react-hook-form'

import { useTranslation } from '@/shared/hooks/useTranslation'
import { UseFormRef } from '@/shared/types/form'
import { Button } from '@/shared/ui/Button'
import { Card } from '@/shared/ui/Card'
import { ControlledTextArea } from '@/shared/ui_controlled/ControlledTextArea'
import { ControlledTextField } from '@/shared/ui_controlled/ControlledTextField'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'

import s from './EditProfileForm.module.scss'

import {
  EditProfileFormValues,
  editProfileSchema,
} from '../../model/utils/validators/editProfileSchema'

type Props = {
  disabled?: boolean
  onSubmit: (data: EditProfileFormValues) => void
  userData?: any
} & Omit<ComponentPropsWithoutRef<'form'>, 'onSubmit'>

export const EditProfileForm = forwardRef<UseFormRef<EditProfileFormValues>, Props>(
  ({ className, disabled, onSubmit, userData, ...rest }, ref) => {
    const { t } = useTranslation()

    const {
      control,
      formState: { errors, isValid },
      handleSubmit,
      reset,
      setError,
    } = useForm<EditProfileFormValues>({
      defaultValues: {
        aboutMe: userData?.aboutMe || '',
        birthDate: userData?.birthDate || '',
        city: userData?.city || '',
        firstName: userData?.firstName || '',
        lastName: userData?.lastName || '',
        userName: userData?.userName || '',
      },
      mode: 'onTouched',
      resolver: zodResolver(editProfileSchema(t)),
    })

    useImperativeHandle(ref, () => ({ reset, setError }))

    return (
      <Card
        asComponent="form"
        className={clsx(s.form, className)}
        onSubmit={handleSubmit(onSubmit)}
        {...rest}
      >
        <ControlledTextField
          control={control}
          disabled={disabled}
          error={errors.userName?.message}
          label={t.label.userName}
          name="userName"
        />
        <ControlledTextField
          control={control}
          disabled={disabled}
          error={errors.firstName?.message}
          label={t.label.firstName}
          name="firstName"
        />
        <ControlledTextField
          control={control}
          disabled={disabled}
          error={errors.lastName?.message}
          label={t.label.lastName}
          name="lastName"
        />
        <ControlledTextArea
          control={control}
          disabled={disabled}
          error={errors.aboutMe?.message}
          label={t.label.aboutMe}
          name="aboutMe"
          resize="none"
          rows={3}
        />
        <Button className={s.submit} disabled={disabled || !isValid} type="submit">
          {t.button.save}
        </Button>
      </Card>
    )
  }
)

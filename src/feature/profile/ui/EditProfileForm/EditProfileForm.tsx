import { ComponentPropsWithoutRef, forwardRef, useImperativeHandle } from 'react'
import { Controller } from 'react-hook-form'

import { GeneralRoutes } from '@/shared/const/routes'
import { useFormRevalidateWithLocale } from '@/shared/hooks/useFormRevalidateWithLocale'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { UseFormRef } from '@/shared/types/form'
import { Button } from '@/shared/ui/Button'
import { Card } from '@/shared/ui/Card'
import { TextField } from '@/shared/ui/TextField'
import { ControlledDatePicker } from '@/shared/ui_controlled/ControlledDatePicker'
import { ControlledTextArea } from '@/shared/ui_controlled/ControlledTextArea'
import { ControlledTextField } from '@/shared/ui_controlled/ControlledTextField'
import clsx from 'clsx'
import Link from 'next/link'

import s from './EditProfileForm.module.scss'

import { useEditProfileForm } from '../../model/hooks/useEditProfileForm'
import { GetProfileResponse } from '../../model/types/profile.types'
import { EditProfileFormValues } from '../../model/utils/validators/editProfileSchema'

type Props = {
  disabled?: boolean
  onSubmit: (data: EditProfileFormValues) => void
  userData?: GetProfileResponse
} & Omit<ComponentPropsWithoutRef<'form'>, 'onSubmit'>

export const EditProfileForm = forwardRef<UseFormRef<EditProfileFormValues>, Props>(
  ({ className, disabled, onSubmit, userData, ...rest }, ref) => {
    const { locale, t } = useTranslation()

    const {
      changeCityRef,
      control,
      errors,
      getValues,
      handleSubmit,
      isValid,
      reset,
      setError,
      setValue,
    } = useEditProfileForm(t, userData)

    useImperativeHandle(ref, () => ({ reset, setError }))

    useFormRevalidateWithLocale({ errors, locale, setValue, values: getValues() })

    return (
      <Card
        asComponent="form"
        className={clsx(s.form, className)}
        onSubmit={handleSubmit(onSubmit)}
        {...rest}
      >
        <ControlledTextField
          className={s.field}
          control={control}
          disabled={disabled}
          error={errors.username?.message}
          label={t.label.userName}
          name="username"
        />
        <ControlledTextField
          className={s.field}
          control={control}
          disabled={disabled}
          error={errors.firstname?.message}
          label={t.label.firstName}
          name="firstname"
        />
        <ControlledTextField
          className={s.field}
          control={control}
          disabled={disabled}
          error={errors.lastname?.message}
          label={t.label.lastName}
          name="lastname"
        />
        <ControlledDatePicker
          className={s.field}
          control={control}
          disabled={disabled}
          error={
            errors.birthDate?.message && (
              <>
                {errors.birthDate?.message}
                <Link
                  className={s.link}
                  href={{ pathname: GeneralRoutes.PRIVACY, query: { sender: 'profile' } }}
                  target="_blank"
                >
                  {t.pages.privacy.title}
                </Link>
              </>
            )
          }
          label={t.label.birthDate}
          maxDate={new Date()}
          name="birthDate"
        />
        <Controller
          control={control}
          name="city"
          render={({ field }) => (
            <TextField
              disabled={disabled}
              error={errors.city?.message}
              label={t.label.city}
              {...field}
              autoComplete="off"
              placeholder=""
              ref={changeCityRef}
            />
          )}
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

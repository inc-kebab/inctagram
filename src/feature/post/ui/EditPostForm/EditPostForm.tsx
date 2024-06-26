import { ComponentPropsWithoutRef, forwardRef, useImperativeHandle } from 'react'
import { useForm } from 'react-hook-form'

import { useFormRevalidateWithLocale, useTranslation } from '@/shared/hooks'
import { UseFormRef } from '@/shared/types/form'
import { Button } from '@/shared/ui/Button'
import { Typography } from '@/shared/ui/Typography'
import { ControlledTextArea } from '@/shared/ui_controlled/ControlledTextArea'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'

import s from './EditPostForm.module.scss'

import { AdditionalRefProps } from '../../model/types/post.types'
import { EditPostFormValues, editPostSchema } from '../../model/utils/validators/editPostSchema'

type Props = {
  classNameSubmit?: string
  currentDescription?: Nullable<string>
  disabled?: boolean
  onSubmit: (data: EditPostFormValues) => void
  titleSubmit?: string
} & Omit<ComponentPropsWithoutRef<'form'>, 'onSubmit'>

export const EditPostForm = forwardRef<UseFormRef<EditPostFormValues, AdditionalRefProps>, Props>(
  (
    { className, classNameSubmit, currentDescription, disabled, onSubmit, titleSubmit, ...rest },
    ref
  ) => {
    const { locale, t } = useTranslation()

    const {
      control,
      formState: { errors, isDirty, isValid },
      getValues,
      handleSubmit,
      reset,
      setError,
      setValue,
      watch,
    } = useForm<EditPostFormValues>({
      defaultValues: {
        description: currentDescription || '',
      },
      mode: 'all',
      resolver: zodResolver(editPostSchema(t)),
    })

    useImperativeHandle(ref, () => ({ isDirty, reset, setError }))

    useFormRevalidateWithLocale({ errors, locale, setValue, values: getValues() })

    return (
      <form className={clsx(s.form, className)} onSubmit={handleSubmit(onSubmit)} {...rest}>
        <div className={s.area}>
          <ControlledTextArea
            control={control}
            disabled={disabled}
            error={errors.description?.message}
            label={t.pages.post.editPostModal.areaLabel}
            name="description"
            placeholder={t.placeholders.postDescription}
            resize="none"
            rows={3}
          />
          <Typography
            className={s.valueLength}
            variant="smallLink"
          >{`${watch('description').length}/500`}</Typography>
        </div>
        <Button
          className={clsx(s.btn, classNameSubmit)}
          disabled={disabled || !isValid}
          type="submit"
        >
          {titleSubmit || t.pages.post.editPostModal.acceptBtn}
        </Button>
      </form>
    )
  }
)

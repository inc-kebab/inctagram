import { ComponentPropsWithoutRef, forwardRef, useImperativeHandle } from 'react'
import { useForm } from 'react-hook-form'

import { useTranslation } from '@/shared/hooks/useTranslation'
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
  currentDescription?: null | string // ? check
  disabled?: boolean
  onSubmit: (data: EditPostFormValues) => void
} & Omit<ComponentPropsWithoutRef<'form'>, 'onSubmit'>

export const EditPostForm = forwardRef<UseFormRef<EditPostFormValues, AdditionalRefProps>, Props>(
  ({ className, currentDescription, disabled, onSubmit, ...rest }, ref) => {
    const { t } = useTranslation()

    const {
      control,
      formState: { errors, isDirty, isValid },
      handleSubmit,
      reset,
      setError,
      watch,
    } = useForm<EditPostFormValues>({
      defaultValues: {
        description: currentDescription || '',
      },
      mode: 'onTouched',
      resolver: zodResolver(editPostSchema(t)),
    })

    useImperativeHandle(ref, () => ({ isDirty, reset, setError }))

    return (
      <form className={clsx(s.form, className)} onSubmit={handleSubmit(onSubmit)} {...rest}>
        <div className={s.area}>
          <ControlledTextArea
            control={control}
            disabled={disabled}
            error={errors.description?.message}
            label={t.pages.post.editPostModal.areaLabel}
            name="description"
            resize="none"
            rows={3}
          />
          <Typography
            className={s.valueLength}
            variant="smallLink"
          >{`${watch('description').length}/500`}</Typography>
        </div>
        <Button className={s.btn} disabled={disabled && isValid} type="submit">
          {t.pages.post.editPostModal.acceptBtn}
        </Button>
      </form>
    )
  }
)

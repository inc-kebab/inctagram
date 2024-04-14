import { FormEvent, Ref, forwardRef, useImperativeHandle } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import { useTranslation } from '@/shared/hooks'
import { UseFormRef } from '@/shared/types/form'
import { Button } from '@/shared/ui/Button'
import { ControlledTextField } from '@/shared/ui_controlled/ControlledTextField'
import clsx from 'clsx'

import s from './PublishCommentForm.module.scss'

type Props = {
  className?: string
  disabled?: boolean
  onSubmit?: SubmitHandler<FieldValues>
}

// TODO

export const PublishCommentForm = forwardRef(
  ({ className, disabled, onSubmit }: Props, ref: Ref<UseFormRef<FieldValues>>) => {
    const { t } = useTranslation()

    const {
      control,
      formState: {},
      handleSubmit,
      reset,
      setError,
    } = useForm()

    const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
    }

    useImperativeHandle(ref, () => ({ reset, setError }))

    return (
      <form className={clsx(s.form, className)} onSubmit={onSubmitHandler}>
        <ControlledTextField
          className={s.textField}
          classNameInput={s.input}
          control={control}
          name="comment"
          placeholder={t.placeholders.comment}
        />
        <Button className={s.publishBtn} disabled={disabled} variant="text">
          {t.button.publish}
        </Button>
      </form>
    )
  }
)

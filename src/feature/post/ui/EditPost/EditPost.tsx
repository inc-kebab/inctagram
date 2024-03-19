import { ReactNode, Ref, forwardRef, useImperativeHandle, useState } from 'react'
import { useForm } from 'react-hook-form'

import { AdditionalRefProps } from '@/feature/post/model/types/post.types'
import { EditPostFormValues, editPostSchema } from '@/feature/post/model/utils/validators/editPost'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { UseFormRef } from '@/shared/types/form'
import { Button } from '@/shared/ui/Button'
import { Typography } from '@/shared/ui/Typography'
import { ControlledTextArea } from '@/shared/ui_controlled/ControlledTextArea'
import { ConfirmDialog } from '@/widgets/dialogs'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './EditPost.module.scss'

type Props = {
  children?: ReactNode
  disabled?: boolean
  onCloseHandle: () => void
  onSubmit: (data: EditPostFormValues) => void
}

export const EditPost = forwardRef(
  (
    { children, disabled, onCloseHandle, onSubmit }: Props,
    ref: Ref<UseFormRef<EditPostFormValues, AdditionalRefProps>>
  ) => {
    const [onOpen, setOnOpen] = useState(false)
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
        description: '',
      },
      mode: 'onTouched',
      resolver: zodResolver(editPostSchema(t)),
    })

    useImperativeHandle(ref, () => ({ isDirty, onOpen: setOnOpen, reset, setError }))

    return (
      <div className={s.block}>
        {children}
        <form className={s.blockArea} onSubmit={handleSubmit(onSubmit)}>
          <ControlledTextArea
            className={s.editPostArea}
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
          >{`200/${watch('description').length}`}</Typography>
          <Button className={s.btn} disabled={disabled && isValid}>
            {t.pages.post.editPostModal.acceptBtn}
          </Button>
        </form>
        <ConfirmDialog
          confirmCallback={onCloseHandle}
          content={<Typography>{t.pages.post.editInfoModal.message}</Typography>}
          onOpenChange={setOnOpen}
          open={onOpen}
          title={t.pages.post.editInfoModal.title}
        />
      </div>
    )
  }
)

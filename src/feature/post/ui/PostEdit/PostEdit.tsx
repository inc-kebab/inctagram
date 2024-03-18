import { ReactNode, useState } from 'react'
import { useForm } from 'react-hook-form'

import { editPostSchema } from '@/feature/post/model/utils/validators/editPost'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Button } from '@/shared/ui/Button'
import { Dialog } from '@/shared/ui/Dialog'
import { Typography } from '@/shared/ui/Typography'
import { ControlledTextArea } from '@/shared/ui_controlled/ControlledTextArea'
import { zodResolver } from '@hookform/resolvers/zod'
import { CloseIcon } from 'next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon'

import s from './PostEdit.module.scss'

type Props = {
  children: ReactNode
  disabled?: boolean
  trigger: ReactNode
}

export const PostEdit = ({ children, disabled, trigger }: Props) => {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation()
  const {
    control,
    formState: { errors, isValid },
    getValues,
    handleSubmit,
    reset,
    setError,
  } = useForm<{ description: string }>({
    defaultValues: {
      description: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(editPostSchema(t)),
  })

  console.log(getValues('description').length)

  return (
    <div className={s.block}>
      <div style={{ borderBottom: '1px solid white', height: 40, width: 700 }}>
        <Button onClick={() => setOpen(true)} variant="text">
          <CloseIcon />
        </Button>
      </div>
      {children}
      <div className={s.blockArea}>
        <ControlledTextArea
          className={s.editPostArea}
          control={control}
          disabled={disabled}
          error={errors.description?.message}
          label="Add publication descriptions"
          name="description"
          resize="none"
          rows={3}
        />
        <Typography
          className={s.valueLength}
          variant="smallLink"
        >{`200/${getValues('description').length}`}</Typography>
      </div>
      <div className={s.btn}>{trigger}</div>
      <Dialog onOpenChange={setOpen} open={open} title="Modal info">
        <div>
          <Typography>
            Do you really want to finish editing? If you close the changes you have made will not be
            saved.
          </Typography>
          <div>
            <Button>Yes</Button>
            <Button variant="outline">No</Button>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

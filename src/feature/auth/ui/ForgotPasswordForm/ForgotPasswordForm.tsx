import { ComponentPropsWithoutRef, forwardRef, useImperativeHandle, useState } from 'react'
import { useForm } from 'react-hook-form'

import { useTranslation } from '@/shared/hooks/useTranslation'
import { Button } from '@/shared/ui/Button'
import { Card } from '@/shared/ui/Card'
import { Dialog } from '@/shared/ui/Dialog'
import { Typography } from '@/shared/ui/Typography'
import { ControlledTextField } from '@/shared/ui_controlled/ControlledTextField'
import { Recaptcha } from '@/widgets/recaptcha/ui/Recaptcha/Recaptcha'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'

import s from './ForgotPasswordForm.module.scss'

import {
  ForgotPasswordFormValues,
  forgotPasswordSchema,
} from '../../model/utils/validators/forgotPasswordValidationSchema'

export type ForgotPasswordProps = {
  disabled?: boolean
  onSubmit: (data: ForgotPasswordFormValues) => void
  setDisabled: (disabled: boolean) => void
} & Omit<ComponentPropsWithoutRef<'form'>, 'onSubmit'>

export const ForgotPasswordForm = forwardRef(
  ({ disabled, onSubmit, setDisabled }: ForgotPasswordProps, ref) => {
    const [modal, setModal] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')
    const { t } = useTranslation()
    const {
      control,
      formState: { errors, isValid },
      handleSubmit,
      setError,
    } = useForm<ForgotPasswordFormValues>({
      defaultValues: {
        email: '',
        recaptcha: '',
      },
      mode: 'onBlur',
      resolver: zodResolver(forgotPasswordSchema(t)),
    })

    useImperativeHandle(ref, () => ({ setEmail, setError, setModal }))

    const modalHandler = () => {
      setModal(!modal)
      setDisabled(true)
    }

    return (
      <Card asComponent="form" className={s.card} onSubmit={handleSubmit(onSubmit)}>
        <Typography textAlign="center" variant="h1">
          {t.pages.forgotPassword.title}
        </Typography>
        <ControlledTextField
          className={s.textField}
          control={control}
          error={errors?.email?.message}
          label={t.label.email}
          name="email"
          type="email"
        />
        <Typography className={s.description} variant="regular14">
          {t.pages.forgotPassword.description}
        </Typography>
        <Button className={s.button} disabled={disabled || !isValid} fullWidth type="submit">
          {t.button.sendLink}
        </Button>
        <Button
          asComponent={Link}
          className={s.link}
          href="/auth/sign-in"
          type="button"
          variant="text"
        >
          {t.button.backToSignIn}
        </Button>
        <Recaptcha control={control} error={errors.recaptcha?.message} name="recaptcha" />
        <Dialog
          className={s.dialogContainer}
          onOpenChange={() => setModal(!modal)}
          open={modal}
          title="Email sent"
        >
          <div className={s.modal}>
            <Typography asComponent="p" className={s.modalMessage}>
              {`We have sent a link to confirm your email to ${email}`}
            </Typography>
            <div className={s.modalBtn}>
              <Button onClick={modalHandler}>OK</Button>
            </div>
          </div>
        </Dialog>
      </Card>
    )
  }
)

import { ComponentPropsWithoutRef, Ref, forwardRef, useEffect, useImperativeHandle } from 'react'
import { useForm } from 'react-hook-form'

import { Github, Google } from '@/shared/assets/icons/other'
import { AuthRoutes } from '@/shared/const/routes'
import { useResetValues } from '@/shared/hooks/useResetValues'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { UseFormRef } from '@/shared/types/form'
import { Button } from '@/shared/ui/Button'
import { Card } from '@/shared/ui/Card'
import { Trans } from '@/shared/ui/Trans'
import { Typography } from '@/shared/ui/Typography'
import { ControlledCheckbox } from '@/shared/ui_controlled/ControlledCheckbox'
import { ControlledTextField } from '@/shared/ui_controlled/ControlledTextField'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import Link from 'next/link'

import s from './SignUpForm.module.scss'

import { SignUpFormValues, signUpSchema } from '../../model/utils/validators/signUpValidationSchema'

type Props = {
  disabled?: boolean
  hrefGithub: string
  hrefGoogle: string
  onSubmit: (data: SignUpFormValues) => void
} & Omit<ComponentPropsWithoutRef<'form'>, 'onSubmit'>

export const SignUpForm = forwardRef(
  (
    { className, disabled, hrefGithub, hrefGoogle, onSubmit, ...props }: Props,
    ref: Ref<UseFormRef<SignUpFormValues>>
  ) => {
    const { locale, t } = useTranslation()

    const {
      control,
      formState: { errors, isValid },
      getValues,
      handleSubmit,
      reset,
      setError,
      setValue,
    } = useForm<SignUpFormValues>({
      defaultValues: {
        accept: false,
        email: '',
        password: '',
        passwordConfirm: '',
        username: '',
      },
      mode: 'onTouched',
      resolver: zodResolver(signUpSchema(t)),
    })

    useResetValues<SignUpFormValues>({ errors, getValues, locale, setValue })

    useImperativeHandle(ref, () => ({ reset, setError }))

    return (
      <Card
        asComponent="form"
        className={clsx(s.form, className)}
        onSubmit={handleSubmit(onSubmit)}
        {...props}
      >
        <Typography asComponent="h1" className={s.formName} textAlign="center" variant="h1">
          {t.pages.signUp.title}
        </Typography>
        <div className={s.formNetwork}>
          <Button
            asComponent={Link}
            className={s.networkLink}
            href={hrefGoogle}
            type="button"
            variant="text"
          >
            <Google />
          </Button>
          <Button
            asComponent={Link}
            className={s.networkLink}
            href={hrefGithub}
            type="button"
            variant="text"
          >
            <Github />
          </Button>
        </div>
        <ControlledTextField
          autoComplete="username"
          className={s.input}
          control={control}
          disabled={disabled}
          error={errors.username?.message}
          label={t.label.userName}
          name="username"
          rules={{ required: true }}
        />
        <ControlledTextField
          autoComplete="email"
          className={s.input}
          control={control}
          disabled={disabled}
          error={errors.email?.message}
          label={t.label.email}
          name="email"
          rules={{ required: true }}
          type="email"
        />
        <ControlledTextField
          autoComplete="new-password"
          className={s.input}
          control={control}
          disabled={disabled}
          error={errors.password?.message}
          label={t.label.password}
          name="password"
          rules={{ required: true }}
          type="password"
        />
        <ControlledTextField
          autoComplete="new-password"
          className={s.passwordConfirm}
          control={control}
          disabled={disabled}
          error={errors.passwordConfirm?.message}
          label={t.label.confirmPassword}
          name="passwordConfirm"
          rules={{ required: true }}
          type="password"
        />
        <ControlledCheckbox
          className={s.checkbox}
          control={control}
          disabled={disabled}
          label={
            <Typography variant="small">
              <Trans
                tags={{
                  '1': () => (
                    <Typography asComponent={Link} href={AuthRoutes.TERMS} variant="smallLink">
                      {t.pages.signUp.agreement.terms}
                    </Typography>
                  ),
                  '2': () => (
                    <Typography asComponent={Link} href={AuthRoutes.PRIVACY} variant="smallLink">
                      {t.pages.signUp.agreement.privacy}
                    </Typography>
                  ),
                }}
                text={t.pages.signUp.agreement.description}
              />
            </Typography>
          }
          name="accept"
        />
        <Button className={s.signUp} disabled={disabled || !isValid} fullWidth>
          {t.button.signUp}
        </Button>
        <Typography className={s.footerText} textAlign="center">
          {t.pages.signUp.question}
        </Typography>
        <Button asComponent={Link} fullWidth href={AuthRoutes.SIGN_IN} variant="text">
          {t.button.signIn}
        </Button>
      </Card>
    )
  }
)

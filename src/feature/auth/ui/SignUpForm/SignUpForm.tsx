import { useForm } from 'react-hook-form'

import { Github, Google } from '@/shared/assets/icons/other'
import { AuthRoutes } from '@/shared/const/routes'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Button } from '@/shared/ui/Button'
import { Card } from '@/shared/ui/Card'
import { Typography } from '@/shared/ui/Typography'
import { ControlledCheckbox } from '@/shared/ui_controlled/ControlledCheckbox'
import { ControlledTextField } from '@/shared/ui_controlled/ControlledTextField'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'

import s from './SignUpForm.module.scss'

import { SignUpSchema, SignUpSchemaType } from '../../model/utils/validators/signUpValidationSchema'

type Props = {
  disabled?: boolean
  onSubmit: (data: SignUpSchemaType) => void
}
export const SignUpForm = ({ disabled, onSubmit }: Props) => {
  const { t } = useTranslation()

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<SignUpSchemaType>({
    defaultValues: {
      accept: false,
      email: '',
      password: '',
      passwordConfirm: '',
      username: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(SignUpSchema(t)),
  })

  return (
    <Card>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <Typography asComponent="h1" className={s.formName} textAlign="center" variant="h1">
          Sign Up
        </Typography>
        <div className={s.formNetwork}>
          <Button className={s.networkLink} variant="text">
            <Google />
          </Button>
          <Button className={s.networkLink} variant="text">
            <Github />
          </Button>
        </div>
        <ControlledTextField
          className={s.input}
          control={control}
          disabled={disabled}
          error={errors.username?.message}
          label="Username"
          name="username"
          rules={{ required: true }}
        />
        <ControlledTextField
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
          className={s.input}
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
            <Typography asComponent="p" className={s.terms} variant="small">
              I agree to the{' '}
              <Typography
                asComponent="a"
                className={s.terms}
                href={AuthRoutes.TERMS}
                variant="smallLink"
              >
                Terms of Service{' '}
              </Typography>
              and{' '}
              <Typography
                asComponent="a"
                className={s.terms}
                href={AuthRoutes.PRIVACY}
                variant="smallLink"
              >
                Privacy Policy
              </Typography>
            </Typography>
          }
          name="accept"
          rules={{ required: true }}
          type="button"
        />

        <Button disabled={disabled} fullWidth>
          Sign Up
        </Button>
        <div className={s.footer}>
          <Typography className={s.footerText} textAlign="center">
            Do you have an account?
          </Typography>
          <Button asComponent={Link} fullWidth href={AuthRoutes.SIGN_IN} variant="text">
            Sign In
          </Button>
        </div>
      </form>
    </Card>
  )
}

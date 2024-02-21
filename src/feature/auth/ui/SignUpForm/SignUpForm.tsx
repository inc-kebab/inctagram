import { SubmitHandler, useForm } from 'react-hook-form'

import { AuthRoutes } from '@/shared/const/routes'
import { Button } from '@/shared/ui/Button'
import { Card } from '@/shared/ui/Card'
import { Typography } from '@/shared/ui/Typography'
import { ControlledCheckbox } from '@/shared/ui_controlled/ControlledCheckbox'
import { ControlledTextField } from '@/shared/ui_controlled/ControlledTextField'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import Link from 'next/link'

import s from './SignUpForm.module.scss'

import githubImage from '../../../../../public/github-svgrepo-com 2.png'
import googleImage from '../../../../../public/google-svgrepo-com 1.png'
import { SignUpSchema, SignUpSchemaType } from '../../model/utils/validators/signUpValidationSchema'

type Props = {
  disabled?: boolean
  onSubmit: (data: SignUpSchemaType) => void
}
export const SignUpForm = (props: Props) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<SignUpSchemaType>({ mode: 'onBlur', resolver: zodResolver(SignUpSchema) })

  const { disabled, onSubmit } = props

  const onSubmitHandler: SubmitHandler<SignUpSchemaType> = (data: SignUpSchemaType) => {
    onSubmit(data)
  }

  return (
    <Card>
      <form className={s.form} onSubmit={handleSubmit(onSubmitHandler)}>
        <Typography asComponent="h1" textAlign="center" variant="h1">
          Sign Up
        </Typography>
        <div className={s.form_network}>
          <Button asComponent="a" className={s.network_link} href="#" variant="text">
            <Image alt="git icon" height={36} src={googleImage} width={36} />
          </Button>
          <Button asComponent="a" className={s.network_link} href="#" variant="text">
            <Image alt="google icon" height={36} src={githubImage} width={36} />
          </Button>
        </div>
        <ControlledTextField
          className={s.input}
          control={control}
          error={errors.username?.message}
          label="Username"
          name="username"
          rules={{ required: true }}
        />
        <ControlledTextField
          className={s.input}
          control={control}
          error={errors.email?.message}
          label="Email"
          name="email"
          rules={{ required: true }}
          type="email"
        />
        <ControlledTextField
          className={s.input}
          control={control}
          error={errors.password?.message}
          label="Password"
          name="password"
          rules={{ required: true }}
          type="password"
        />
        <ControlledTextField
          className={s.input}
          control={control}
          error={errors.passwordConfirm?.message}
          label="Password confirmation"
          name="passwordConfirm"
          rules={{ required: true }}
          type="password"
        />

        <ControlledCheckbox
          className={s.checkbox}
          control={control}
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
          <p>Do you have an account?</p>
          <Button fullWidth variant="text">
            <Link href="/auth/sign-in">Sign In</Link>
          </Button>
        </div>
      </form>
    </Card>
  )
}

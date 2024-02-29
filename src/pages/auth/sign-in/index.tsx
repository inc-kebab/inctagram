import { ReactElement, useRef } from 'react'
import { toast } from 'react-toastify'

import { SignInForm } from '@/feature/auth'
import { useLoginMutation } from '@/feature/auth/api/auth-api'
import { ErrorDescription, ErrorType } from '@/feature/auth/model/types/api.types'
import { SignInFormValues } from '@/feature/auth/model/utils/validators/signInValidationSchema'
import { RefType } from '@/feature/auth/ui/SignInForm/SignInForm'
import { Page } from '@/shared/types/layout'
import { AuthLayout } from '@/widgets/layout'

import s from './SignIn.module.scss'

const SignIn: Page = () => {
  const [logIn, { isLoading }] = useLoginMutation()

  const ref = useRef<RefType>(null)

  const logInHandler = (data: SignInFormValues) => {
    logIn(data).then(res => {
      if ('error' in res) {
        const error = res.error

        if ('error' in error) {
          toast.error(error.error)
        }

        const { data } = res.error as ErrorType

        if (data.message) {
          toast.error(data.message)
        }
        if (data.errorDescription) {
          data.errorDescription.forEach(error => {
            if (ref.current) {
              ref.current.setError(error.field as keyof SignInFormValues, {
                message: error.message,
              })
            }
          })
        }
      }
    })
  }

  return (
    <SignInForm
      className={s.signIn}
      disabled={isLoading}
      hrefToLoginGithub={process.env.GITHUB_OAUTH2 || ''} // почему не видно переменной ?
      hrefToLoginGoogle={process.env.GOOGLE_OAUTH2 || ''}
      onSubmit={logInHandler}
      ref={ref}
    />
  )
}

SignIn.getLayout = (page: ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>
}

export default SignIn

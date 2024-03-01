import { ReactElement, useRef } from 'react'

import { SignInForm } from '@/feature/auth'
import { useLoginMutation } from '@/feature/auth/api/auth-api'
import { SignInFormValues } from '@/feature/auth/model/utils/validators/signInValidationSchema'
import { handleErrorResponse } from '@/shared/helpers/handleErrorResponse'
import { UseFormRef } from '@/shared/types/form'
import { Page } from '@/shared/types/layout'
import { AuthLayout } from '@/widgets/layout'

import s from './SignIn.module.scss'

const SignIn: Page = () => {
  const [logIn, { isLoading }] = useLoginMutation()

  const ref = useRef<UseFormRef<SignInFormValues>>(null)

  const logInHandler = (data: SignInFormValues) => {
    logIn(data).then(res => {
      if ('error' in res && ref.current) {
        const setError = ref.current.setError

        const errors = handleErrorResponse<SignInFormValues>(res.error)

        errors?.fieldErrors?.forEach(error => {
          setError(error.field, { message: error.message })
        })
      }
    })
  }

  return (
    <SignInForm
      className={s.signIn}
      disabled={isLoading}
      hrefGithub={process.env.NEXT_PUBLIC_GITHUB_OAUTH2!}
      hrefGoogle={process.env.NEXT_PUBLIC_GOOGLE_OAUTH2!}
      onSubmit={logInHandler}
      ref={ref}
    />
  )
}

SignIn.getLayout = (page: ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>
}

export default SignIn

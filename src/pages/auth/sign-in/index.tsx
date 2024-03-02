import { ReactElement, useRef } from 'react'

import { SignInForm, SignInFormValues, useLoginMutation } from '@/feature/auth'
import { handleErrorResponse } from '@/shared/helpers/handleErrorResponse'
import { UseFormRef } from '@/shared/types/form'
import { Page } from '@/shared/types/layout'
import { AuthLayout } from '@/widgets/layout'

import s from './SignIn.module.scss'

const SignIn: Page = () => {
  const [signIn, { isLoading }] = useLoginMutation()

  const ref = useRef<UseFormRef<SignInFormValues>>(null)

  const handleSignIn = (data: SignInFormValues) => {
    signIn(data).then(res => {
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
      onSubmit={handleSignIn}
      ref={ref}
    />
  )
}

SignIn.getLayout = (page: ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>
}

export default SignIn

import { ReactElement, useState } from 'react'

import { SignInForm } from '@/feature/auth'
import { useLoginMutation } from '@/feature/auth/api/auth-api'
import { ErrorType } from '@/feature/auth/model/types/api.types'
import { SignInFormValues } from '@/feature/auth/model/utils/validators/signInValidationSchema'
import { AppRoutes } from '@/shared/const/routes'
import { Page } from '@/shared/types/layout'
import { AuthLayout } from '@/widgets/layout'
import { useRouter } from 'next/router'

import s from './SignIn.module.scss'

const SignIn: Page = () => {
  const [logIn, { isLoading }] = useLoginMutation()
  const [error, setError] = useState('')
  const router = useRouter()

  const logInHandler = async (data: SignInFormValues) => {
    try {
      await logIn(data).unwrap()
      router.push(AppRoutes.HOME)
      setError('')
    } catch (err) {
      const error = err as ErrorType

      setError(error.data.message)
    }
  }

  return (
    <SignInForm className={s.signIn} disabled={isLoading} error={error} onSubmit={logInHandler} />
  )
}

SignIn.getLayout = (page: ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>
}

export default SignIn

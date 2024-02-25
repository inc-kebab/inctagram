import { ReactElement } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/store/store'
import { SignInForm } from '@/feature/auth'
import { useLoginMutation } from '@/feature/auth/api/auth-api'
import { authActions } from '@/feature/auth/api/auth-slice'
import { ErrorType } from '@/feature/auth/model/types/api.types'
import { SignInFormValues } from '@/feature/auth/model/utils/validators/signInValidationSchema'
import { AppRoutes } from '@/shared/const/routes'
import { Page } from '@/shared/types/layout'
import { AuthLayout } from '@/widgets/layout'
import { useRouter } from 'next/router'

import s from './SignIn.module.scss'

const SignIn: Page = () => {
  const dispatch = useAppDispatch()
  const error = useAppSelector(state => state.auth.error)
  const [logIn, { isLoading }] = useLoginMutation()
  const router = useRouter()

  const logInHandler = async (data: SignInFormValues) => {
    try {
      await logIn({ email: data.email, password: data.password }).unwrap()
      router.push(AppRoutes.HOME)
    } catch (err) {
      const error = err as ErrorType

      dispatch(authActions.setError(error.data.message))
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

import { useRef } from 'react'

import { SignInForm, SignInFormValues, useLoginMutation } from '@/feature/auth'
import { AppRoutes, GeneralRoutes } from '@/shared/const/routes'
import { handleErrorResponse } from '@/shared/helpers/handleErrorResponse'
import { DefenderAuthRoute } from '@/shared/helpers/hoc/DefenderAuthRoute'
import { UseFormRef } from '@/shared/types/form'
import { Page } from '@/shared/types/layout'
import { AuthLayout } from '@/widgets/layout'
import { useRouter } from 'next/router'

import s from './SignIn.module.scss'

const SignIn: Page = () => {
  const ref = useRef<UseFormRef<SignInFormValues>>(null)

  const { push } = useRouter()

  const [signIn, { isLoading }] = useLoginMutation()

  const handleSignIn = (data: SignInFormValues) => {
    signIn(data).then(res => {
      if ('data' in res) {
        void push(AppRoutes.PROFILE)
      }
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

SignIn.getLayout = (page, t) => {
  return (
    <AuthLayout description={t.pages.signIn.metaDescription} title={t.pages.signIn.metaTitle}>
      {page}
    </AuthLayout>
  )
}

export default DefenderAuthRoute(SignIn)

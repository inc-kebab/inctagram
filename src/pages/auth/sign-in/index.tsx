import { useEffect, useRef } from 'react'

import { SignInForm, SignInFormValues, useLoginMutation } from '@/feature/auth'
import { AppRoutes } from '@/shared/const/routes'
import { DefenderAuthRoute, handleErrorResponse } from '@/shared/helpers'
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
        const message = JSON.stringify({ action: 'success_sign-in' })

        localStorage.setItem('sign-in', message)

        void push(AppRoutes.PROFILE + `/${res.data.userId}`)
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

  useEffect(() => {
    const handleMessage = (e: StorageEvent) => {
      if (e.newValue) {
        const message = JSON.parse(e.newValue)

        message.action === 'success_sign-in' && void push(AppRoutes.HOME)
      }
    }

    window.addEventListener('storage', handleMessage)

    return () => {
      window.addEventListener('storage', handleMessage)
    }
  }, [push])

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

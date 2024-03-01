import { ReactElement, useRef, useState } from 'react'

import { SignUpForm, SignUpFormValues, useSignUpMutation } from '@/feature/auth'
import { handleErrorResponse } from '@/shared/helpers/handleErrorResponse'
import { UseFormRef } from '@/shared/types/form'
import { Page } from '@/shared/types/layout'
import { DialogEmailSent } from '@/widgets/dialogs'
import { AuthLayout } from '@/widgets/layout'

import s from './SignUp.module.scss'

export const SignUp: Page = () => {
  const [open, setOpen] = useState(false)

  const ref = useRef<UseFormRef<SignUpFormValues>>(null)

  const [signUp, { data, isLoading }] = useSignUpMutation()

  const handleSubmit = ({ accept, passwordConfirm, ...formData }: SignUpFormValues) => {
    signUp(formData).then(res => {
      if ('data' in res) {
        setOpen(true)
      }
      if ('error' in res && ref.current) {
        const setError = ref.current.setError

        const errors = handleErrorResponse<SignUpFormValues>(res.error)

        errors?.fieldErrors?.forEach(error => {
          setError(error.field, { message: error.message })
        })
      }
    })
  }

  const handleChangeOpen = () => {
    setOpen(false)
    if (ref.current) {
      ref.current.reset()
    }
  }

  return (
    <>
      <DialogEmailSent email={data?.email} onOpenChange={handleChangeOpen} open={open} />
      <SignUpForm
        className={s.signUpForm}
        disabled={isLoading}
        hrefGithub={process.env.NEXT_PUBLIC_GITHUB_OAUTH2!}
        hrefGoogle={process.env.NEXT_PUBLIC_GOOGLE_OAUTH2!}
        onSubmit={handleSubmit}
        ref={ref}
      />
    </>
  )
}

SignUp.getLayout = (page: ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>
}

export default SignUp

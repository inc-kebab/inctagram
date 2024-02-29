import { ReactElement, useRef, useState } from 'react'

import { SignUpForm } from '@/feature/auth'
import { useSignUpMutation } from '@/feature/auth/api/auth-api'
import { SignUpSchemaType } from '@/feature/auth/model/utils/validators/signUpValidationSchema'
import { RefType } from '@/feature/auth/ui/SignUpForm/SignUpForm'
import { handleErrorResponse } from '@/shared/helpers/handleErrorResponse'
import { Page } from '@/shared/types/layout'
import { DialogEmailSent } from '@/widgets/Dialogs/dialogEmailSent'
import { AuthLayout } from '@/widgets/layout'

import s from './sigUp.module.scss'

export const SignUp: Page = () => {
  const [signUp, { data, isLoading }] = useSignUpMutation()
  const [open, setOpen] = useState(false)
  const ref = useRef<RefType>(null)
  const onSubmitHandler = ({ accept, passwordConfirm, ...formData }: SignUpSchemaType) => {
    signUp(formData).then(res => {
      if ('data' in res) {
        setOpen(true)
      }
      if ('error' in res && ref.current) {
        const error = res.error
        const setError = ref.current.setError

        handleErrorResponse<SignUpSchemaType>({ error, setError })
      }
    })
  }

  const onOpenChangeHandler = () => {
    setOpen(false)
    if (ref.current) {
      ref.current.reset()
    }
  }

  return (
    <>
      <DialogEmailSent email={data?.email} onOpenChange={onOpenChangeHandler} open={open} />
      <SignUpForm
        className={s.signUpForm}
        disabled={isLoading}
        hrefGithub="#"
        hrefGoogle="#"
        onSubmit={onSubmitHandler}
        ref={ref}
      />
    </>
  )
}

SignUp.getLayout = (page: ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>
}

export default SignUp

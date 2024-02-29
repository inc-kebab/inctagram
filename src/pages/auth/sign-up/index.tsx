import { ReactElement, useRef, useState } from 'react'
import { toast } from 'react-toastify'

import { SignUpForm } from '@/feature/auth'
import { useSignUpMutation } from '@/feature/auth/api/auth-api'
import { ResponseError } from '@/feature/auth/model/types/api.types'
import { SignUpSchemaType } from '@/feature/auth/model/utils/validators/signUpValidationSchema'
import { RefType } from '@/feature/auth/ui/SignUpForm/SignUpForm'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Page } from '@/shared/types/layout'
import { Button } from '@/shared/ui/Button'
import { Dialog } from '@/shared/ui/Dialog'
import { AuthLayout } from '@/widgets/layout'

import s from './sigUp.module.scss'

export const SignUp: Page = () => {
  const { t } = useTranslation()
  const [signUp, { data, isLoading }] = useSignUpMutation()
  const [open, setOpen] = useState(false)
  const ref = useRef<RefType>(null)
  const onSubmitHandler = ({ accept, passwordConfirm, ...formData }: SignUpSchemaType) => {
    signUp(formData).then(res => {
      if ('data' in res) {
        // setEmail(formData.email)
        setOpen(true)
      }
      if ('error' in res) {
        const error = res.error

        if ('data' in error) {
          const error1 = error.data as ResponseError

          error1.errorDescription.forEach(error => {
            if (ref.current) {
              ref.current.setError(error.field as keyof SignUpSchemaType, {
                message: error.message,
              })
            }
          })
        }
        if ('error' in error) {
          toast.error(error.error)
        }
        if ('message' in error) {
          toast.error(error.message)
        }
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
      <Dialog onOpenChange={onOpenChangeHandler} open={open} title="Email sent">
        <div className={s.dialog}>
          {t.pages.signUp.modalText}
          {data?.email}
          <Button onClick={onOpenChangeHandler}>{t.pages.signUp.modalBtn}</Button>
        </div>
      </Dialog>
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

import { ReactElement, useRef, useState } from 'react'
import { toast } from 'react-toastify'

import { ForgotPasswordForm } from '@/feature/auth'
import { useRecoveryPasswordMutation } from '@/feature/auth/api/auth-api'
import { ResponseError } from '@/feature/auth/model/types/api.types'
import { ForgotPasswordFormValues } from '@/feature/auth/model/utils/validators/forgotPasswordValidationSchema'
import { Page } from '@/shared/types/layout'
import { AuthLayout } from '@/widgets/layout'

import s from './ForgotPassword.module.scss'

const ForgotPassword: Page = () => {
  const ref = useRef()
  const [disabled, setDisabled] = useState<boolean>(false)
  const [recoveryPassword] = useRecoveryPasswordMutation()

  const onSubmit = (data: ForgotPasswordFormValues) => {
    recoveryPassword(data).then(res => {
      if ('data' in res) {
        ref.current?.setEmail(data.email)
        ref.current?.setModal(true)
      }
      if ('error' in res) {
        const error = res.error

        if ('data' in error) {
          const error1 = error.data as ResponseError

          error1.errorDescription.forEach(error => {
            if (ref.current) {
              ref.current.setError(error.field as keyof ForgotPasswordFormValues, {
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

  return (
    <section className={s.block}>
      <ForgotPasswordForm
        disabled={disabled}
        onSubmit={onSubmit}
        ref={ref}
        setDisabled={setDisabled}
      />
    </section>
  )
}

ForgotPassword.getLayout = (page: ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>
}

export default ForgotPassword

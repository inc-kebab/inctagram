import { ReactElement, useRef, useState } from 'react'

import { ForgotPasswordForm } from '@/feature/auth'
import { useRecoveryPasswordMutation } from '@/feature/auth/api/auth-api'
import { ForgotPasswordFormValues } from '@/feature/auth/model/utils/validators/forgotPasswordValidationSchema'
import { RefType } from '@/feature/auth/ui/ForgotPasswordForm/ForgotPasswordForm'
import { handleErrorResponse } from '@/shared/helpers/handleErrorResponse'
import { Page } from '@/shared/types/layout'
import { DialogEmailSent } from '@/widgets/dialogs'
import { AuthLayout } from '@/widgets/layout'

import s from './ForgotPassword.module.scss'

const ForgotPassword: Page = () => {
  const ref = useRef<RefType>(null)
  const [modal, setModal] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [success, setSuccess] = useState<boolean>(false)
  const [disabled, setDisabled] = useState<boolean>(false)
  const [recoveryPassword] = useRecoveryPasswordMutation()

  const onSubmit = (data: ForgotPasswordFormValues) => {
    setDisabled(true)
    recoveryPassword(data).then(res => {
      if ('data' in res) {
        setEmail(data.email)
        setModal(true)
        setSuccess(true)
      }
      if ('error' in res && ref.current) {
        const setError = ref.current.setError

        const errors = handleErrorResponse<ForgotPasswordFormValues>(res.error)

        errors?.fieldErrors?.forEach(error => {
          setError(error.field, { message: error.message })
        })
      }
    })
  }

  const modalHandler = () => {
    setModal(!modal)
    setDisabled(true)
    ref.current?.reset()
  }

  return (
    <>
      <ForgotPasswordForm
        className={s.block}
        disabled={disabled}
        onSubmit={onSubmit}
        ref={ref}
        success={success}
      />
      <DialogEmailSent email={email} onOpenChange={modalHandler} open={modal} />
    </>
  )
}

ForgotPassword.getLayout = (page: ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>
}

export default ForgotPassword

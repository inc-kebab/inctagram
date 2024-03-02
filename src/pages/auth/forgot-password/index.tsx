import { ReactElement, useRef, useState } from 'react'

import {
  ForgotPasswordForm,
  ForgotPasswordFormValues,
  useRecoveryPasswordMutation,
  useResendRecoveryPasswordMutation,
} from '@/feature/auth'
import { handleErrorResponse } from '@/shared/helpers/handleErrorResponse'
import { UseFormRef } from '@/shared/types/form'
import { Page } from '@/shared/types/layout'
import { DialogEmailSent } from '@/widgets/dialogs'
import { AuthLayout } from '@/widgets/layout'
import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

import s from './ForgotPassword.module.scss'

type QueryPromiseResult = { data: void } | { error: FetchBaseQueryError | SerializedError }

const ForgotPassword: Page = () => {
  const ref = useRef<UseFormRef<ForgotPasswordFormValues>>(null)

  const [open, setOpen] = useState(false)

  const [recoveryPassword, { isLoading: isRecoveryLoad, isSuccess }] = useRecoveryPasswordMutation()
  const [resendRecoveryPassword, { isLoading: isResendRecoveryLoad }] =
    useResendRecoveryPasswordMutation()

  const handlePromiseSubmit = (promise: Promise<QueryPromiseResult>) => {
    promise.then(res => {
      if ('data' in res) {
        setOpen(true)
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

  const handleSubmitResend = (data: ForgotPasswordFormValues) => {
    handlePromiseSubmit(resendRecoveryPassword({ email: data.email }))
  }

  const handleSubmit = (data: ForgotPasswordFormValues) => {
    handlePromiseSubmit(recoveryPassword(data))
  }

  return (
    <>
      <ForgotPasswordForm
        className={s.block}
        disabled={isRecoveryLoad || isResendRecoveryLoad}
        onSubmit={isSuccess ? handleSubmitResend : handleSubmit}
        ref={ref}
        success={isSuccess}
      />
      <DialogEmailSent email={ref.current?.email} onOpenChange={setOpen} open={open} />
    </>
  )
}

ForgotPassword.getLayout = (page: ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>
}

export default ForgotPassword

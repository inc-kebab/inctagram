import { useRef, useState } from 'react'

import { DialogEmailSent } from '@/entities/dialog'
import {
  ForgotPasswordForm,
  ForgotPasswordFormValues,
  useRecoveryPasswordMutation,
  useResendRecoveryPasswordMutation,
} from '@/feature/auth'
import { DefenderAuthRoute, handleErrorResponse } from '@/shared/helpers'
import { UseFormRef } from '@/shared/types/form'
import { Page } from '@/shared/types/layout'
import { AuthLayout } from '@/widgets/layout'
import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

import s from './ForgotPassword.module.scss'

type QueryPromiseResult = { data: void } | { error: FetchBaseQueryError | SerializedError }

const ForgotPassword: Page = () => {
  const ref = useRef<UseFormRef<ForgotPasswordFormValues>>(null)

  const [open, setOpen] = useState(false)

  const [recoveryPassword, { isError, isLoading: isRecoveryLoad, isSuccess }] =
    useRecoveryPasswordMutation()
  const [resendRecoveryPassword, { isLoading: isResendRecoveryLoad }] =
    useResendRecoveryPasswordMutation()

  const handlePromiseSubmit = (promise: Promise<QueryPromiseResult>, email?: string) => {
    promise.then(res => {
      if ('data' in res) {
        setOpen(true)
      }
      if ('error' in res && ref.current) {
        ref.current.reset({ email })

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
    handlePromiseSubmit(recoveryPassword(data), data.email)
  }

  return (
    <>
      <ForgotPasswordForm
        className={s.block}
        disabled={isRecoveryLoad || isResendRecoveryLoad}
        isError={isError}
        isSuccess={isSuccess}
        onSubmit={isSuccess ? handleSubmitResend : handleSubmit}
        ref={ref}
      />
      <DialogEmailSent email={ref.current?.email} onOpenChange={setOpen} open={open} />
    </>
  )
}

ForgotPassword.getLayout = (page, t) => {
  return (
    <AuthLayout
      description={t.pages.forgotPassword.metaDescription}
      title={t.pages.forgotPassword.metaTitle}
    >
      {page}
    </AuthLayout>
  )
}

export default DefenderAuthRoute(ForgotPassword)

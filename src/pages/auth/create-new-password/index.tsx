import { useEffect, useRef, useState } from 'react'

import { DialogEmailSent } from '@/entities/dialog'
import {
  CreateNewPasswordForm,
  CreateNewPasswordFormValues,
  EmailVerificationBlock,
  useCheckRecoveryCodeMutation,
  useNewPasswordMutation,
  useResendRecoveryPasswordMutation,
} from '@/feature/auth'
import { AuthRoutes } from '@/shared/const/routes'
import { handleErrorResponse } from '@/shared/helpers/handleErrorResponse'
import { DefenderAuthRoute } from '@/shared/helpers/hoc/DefenderAuthRoute'
import { UseFormRef } from '@/shared/types/form'
import { Page } from '@/shared/types/layout'
import { Loader } from '@/shared/ui/Loader'
import { AuthLayout } from '@/widgets/layout'
import { useRouter } from 'next/router'

import s from './CreateNewPassword.module.scss'

const CreateNewPassword: Page = () => {
  const ref = useRef<UseFormRef<CreateNewPasswordFormValues>>(null)
  const [open, setOpen] = useState(false)
  const [showLoader, setShowLoader] = useState(true)

  const router = useRouter()

  const [createNewPassword, { isLoading: isCreateNewPasswordLoad }] = useNewPasswordMutation()
  const [checkRecoveryCode, { data }] = useCheckRecoveryCodeMutation()
  const [resendRecoveryPassword, { isLoading: isResendLoad }] = useResendRecoveryPasswordMutation()

  const recoveryCode = router.query.code as string
  const email = router.query.email as string

  const handleSubmitResend = () => {
    resendRecoveryPassword({ email }).then(res => {
      if ('data' in res) {
        setOpen(true)
      }
      if ('error' in res) {
        handleErrorResponse(res.error)
      }
    })
  }

  const handleSubmit = async (data: CreateNewPasswordFormValues) => {
    const newData = {
      newPassword: data.confirmPassword,
      recoveryCode,
    }

    createNewPassword(newData).then(res => {
      if ('data' in res && ref.current) {
        ref.current.reset()
        router.push(AuthRoutes.SIGN_IN)
      }
      if ('error' in res && ref.current) {
        const setError = ref.current.setError

        const errors = handleErrorResponse<CreateNewPasswordFormValues>(res.error)

        errors?.fieldErrors?.forEach(error => {
          setError(error.field, { message: error.message })
        })
      }
    })
  }

  useEffect(() => {
    if (recoveryCode) {
      checkRecoveryCode({ recoveryCode }).then(res => {
        if ('error' in res) {
          handleErrorResponse(res.error)
        }
        setShowLoader(false)
      })
    }
  }, [recoveryCode, checkRecoveryCode])

  if (showLoader) {
    return <Loader fullHeight />
  }

  return data ? (
    <CreateNewPasswordForm
      className={s.block}
      disabled={isCreateNewPasswordLoad}
      onSubmit={handleSubmit}
      ref={ref}
    />
  ) : (
    <>
      <EmailVerificationBlock disabled={isResendLoad || open} onResendLink={handleSubmitResend} />
      <DialogEmailSent email={email} onOpenChange={setOpen} open={open} />
    </>
  )
}

CreateNewPassword.getLayout = (page, t) => {
  return (
    <AuthLayout
      description={t.pages.createNewPassword.metaDescription}
      title={t.pages.createNewPassword.metaTitle}
    >
      {page}
    </AuthLayout>
  )
}

export default DefenderAuthRoute(CreateNewPassword)

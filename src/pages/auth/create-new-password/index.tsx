import { ReactElement, useEffect, useRef, useState } from 'react'

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
import { UseFormRef } from '@/shared/types/form'
import { Page } from '@/shared/types/layout'
import { Loader } from '@/shared/ui/Loader'
import { DialogEmailSent } from '@/widgets/dialogs'
import { AuthLayout } from '@/widgets/layout'
import { useRouter } from 'next/router'

import s from './CreateNewPassword.module.scss'

const CreateNewPassword: Page = () => {
  const ref = useRef<UseFormRef<CreateNewPasswordFormValues>>(null)
  const [disabled, setDisabled] = useState(false)
  const [open, setOpen] = useState(false)

  const router = useRouter()

  const [newPassword] = useNewPasswordMutation()
  const [checkRecoveryCode, { isLoading, isSuccess }] = useCheckRecoveryCodeMutation()
  const [resendRecoveryPassword] = useResendRecoveryPasswordMutation()

  const recoveryCode = router.query.code as string
  const email = router.query.email as string

  const handleSubmitResend = () => {
    setDisabled(true)
    resendRecoveryPassword({ email }).then(res => {
      if ('data' in res) {
        setOpen(true)
        setDisabled(false)
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

    setDisabled(true)
    newPassword(newData).then(res => {
      setDisabled(false)
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
    checkRecoveryCode({ recoveryCode }).then(res => {
      if ('error' in res) {
        handleErrorResponse(res.error)
      }
    })
  }, [])

  if (isLoading) {
    return <Loader fullHeight />
  }

  return isSuccess ? (
    <CreateNewPasswordForm
      className={s.block}
      disabled={disabled}
      onSubmit={handleSubmit}
      ref={ref}
    />
  ) : (
    <>
      <EmailVerificationBlock onResendLink={handleSubmitResend} />
      <DialogEmailSent email={email} onOpenChange={() => setOpen(false)} open={open} />
    </>
  )
}

CreateNewPassword.getLayout = (page: ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>
}

export default CreateNewPassword

import { ReactElement, useRef, useState } from 'react'

import {
  ForgotPasswordForm,
  ForgotPasswordFormValues,
  useRecoveryPasswordMutation,
} from '@/feature/auth'
import { handleErrorResponse } from '@/shared/helpers/handleErrorResponse'
import { UseFormRef } from '@/shared/types/form'
import { Page } from '@/shared/types/layout'
import { DialogEmailSent } from '@/widgets/dialogs'
import { AuthLayout } from '@/widgets/layout'

import s from './ForgotPassword.module.scss'

const ForgotPassword: Page = () => {
  const ref = useRef<UseFormRef<ForgotPasswordFormValues>>(null)

  const [modal, setModal] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const [recoveryPassword, { isSuccess }] = useRecoveryPasswordMutation()

  const handleSubmit = (data: ForgotPasswordFormValues) => {
    setDisabled(true)
    recoveryPassword(data).then(res => {
      if ('data' in res) {
        setModal(true)
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

  const handleChangeOpen = () => {
    setModal(prev => !prev)
    setDisabled(true)
    ref.current?.reset()
  }

  return (
    <>
      <ForgotPasswordForm
        className={s.block}
        disabled={disabled}
        onSubmit={handleSubmit}
        ref={ref}
        success={isSuccess}
      />
      <DialogEmailSent email={ref.current?.email} onOpenChange={handleChangeOpen} open={modal} />
    </>
  )
}

ForgotPassword.getLayout = (page: ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>
}

export default ForgotPassword

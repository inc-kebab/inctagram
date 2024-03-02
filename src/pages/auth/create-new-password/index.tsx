import { ReactElement, useRef, useState } from 'react'

import {
  CreateNewPasswordForm,
  CreateNewPasswordFormValues,
  useNewPasswordMutation,
} from '@/feature/auth'
import { AuthRoutes } from '@/shared/const/routes'
import { handleErrorResponse } from '@/shared/helpers/handleErrorResponse'
import { UseFormRef } from '@/shared/types/form'
import { Page } from '@/shared/types/layout'
import { AuthLayout } from '@/widgets/layout'
import { useRouter } from 'next/router'

import s from './CreateNewPassword.module.scss'

const CreateNewPassword: Page = () => {
  const ref = useRef<UseFormRef<CreateNewPasswordFormValues>>(null)
  const [disabled, setDisabled] = useState(false)

  const router = useRouter()

  const [newPassword] = useNewPasswordMutation()

  const recoveryCode = router.query.recoveryCode as string

  const handleSubmit = async (data: CreateNewPasswordFormValues) => {
    const newData = {
      newPassword: data.confirmPassword,
      recoveryCode,
    }

    newPassword(newData).then(res => {
      setDisabled(true)
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

  return (
    <CreateNewPasswordForm
      className={s.block}
      disabled={disabled}
      onSubmit={handleSubmit}
      ref={ref}
    />
  )
}

CreateNewPassword.getLayout = (page: ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>
}

export default CreateNewPassword

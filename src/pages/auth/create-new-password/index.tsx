import { ReactElement, useRef, useState } from 'react'

import { CreateNewPasswordForm } from '@/feature/auth'
import { useNewPasswordMutation } from '@/feature/auth/api/auth-api'
import { CreateNewPasswordFormValues } from '@/feature/auth/model/utils/validators/createNewPasswordSchema'
import { RefType } from '@/feature/auth/ui/CreateNewPasswordForm/CreateNewPasswordForm'
import { AuthRoutes } from '@/shared/const/routes'
import { handleErrorResponse } from '@/shared/helpers/handleErrorResponse'
import { Page } from '@/shared/types/layout'
import { AuthLayout } from '@/widgets/layout'
import { useRouter } from 'next/router'

const CreateNewPassword: Page = () => {
  const ref = useRef<RefType>(null)
  const router = useRouter()
  const [disabled, setDisabled] = useState<boolean>(false)
  const [newPassword] = useNewPasswordMutation()
  const recoveryCode = router.query.recoveryCode as string

  const onSubmit = async (data: CreateNewPasswordFormValues) => {
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
          router.push(AuthRoutes.PASSWORD_RECOVERY)
          setError(error.field, { message: error.message })
        })
      }
    })
  }

  return <CreateNewPasswordForm disabled={disabled} onSubmit={onSubmit} ref={ref} />
}

CreateNewPassword.getLayout = (page: ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>
}

export default CreateNewPassword

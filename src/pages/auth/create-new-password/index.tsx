import { ReactElement } from 'react'

import { CreateNewPasswordForm } from '@/feature/auth'
import { useNewPasswordMutation } from '@/feature/auth/api/auth-api'
import { CreateNewPasswordFormValues } from '@/feature/auth/model/utils/validators/createNewPasswordSchema'
import { AuthRoutes } from '@/shared/const/routes'
import { Page } from '@/shared/types/layout'
import { AuthLayout } from '@/widgets/layout'
import { useRouter } from 'next/router'

const CreateNewPassword: Page = () => {
  const router = useRouter()
  const [newPassword] = useNewPasswordMutation()

  const onSubmit = async (data: CreateNewPasswordFormValues) => {
    newPassword(data).then(data => {
      router.push(AuthRoutes.SIGN_IN)
      console.log('success')
    })
  }

  return (
    <section style={{ display: 'grid', height: 'max(100vh - 60px)', placeItems: 'center' }}>
      <CreateNewPasswordForm onSubmit={onSubmit} />
    </section>
  )
}

CreateNewPassword.getLayout = (page: ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>
}

export default CreateNewPassword

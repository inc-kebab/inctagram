import { ReactElement } from 'react'

import { Page } from '@/shared/types/layout'
import { AuthLayout } from '@/widgets/layout'

const CreateNewPassword: Page = () => {
  return <div>Create-new-password page</div>
}

CreateNewPassword.getLayout = (page: ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>
}

export default CreateNewPassword

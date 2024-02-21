import { ReactElement } from 'react'

import { Page } from '@/shared/types/layout'
import { AuthLayout } from '@/widgets/layout'

const ForgotPassword: Page = () => {
  return <div>Forgot-password page</div>
}

ForgotPassword.getLayout = (page: ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>
}

export default ForgotPassword

import { ReactElement } from 'react'

import { Page } from '@/shared/types/layout'
import { AuthLayout } from '@/widgets/layout'

const SignUp: Page = () => {
  return <div>Sign-up page</div>
}

SignUp.getLayout = (page: ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>
}

export default SignUp

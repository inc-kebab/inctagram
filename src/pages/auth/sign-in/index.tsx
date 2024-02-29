import { ReactElement } from 'react'

import { Page } from '@/shared/types/layout'
import { AuthLayout } from '@/widgets/layout'

const SignIn: Page = () => {
  return <div>Sign-in page</div>
}

SignIn.getLayout = (page: ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>
}

export default SignIn

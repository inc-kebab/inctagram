import { ReactElement } from 'react'

import { Page } from '@/shared/types/layout'
import { AuthLayout } from '@/widgets/layout'

const PasswordRecovery: Page = () => {
  return <div>Password-recovery page</div>
}

PasswordRecovery.getLayout = (page: ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>
}

export default PasswordRecovery

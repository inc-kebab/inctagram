import { ReactElement } from 'react'

import { EmailVerificationBlock } from '@/feature/auth'
import { AuthRoutes } from '@/shared/const/routes'
import { Page } from '@/shared/types/layout'
import { AuthLayout } from '@/widgets/layout'
import { useRouter } from 'next/router'

const PasswordRecovery: Page = () => {
  const router = useRouter()

  const onResendLink = () => router.push(AuthRoutes.FORGOT_PASSWORD)

  return <EmailVerificationBlock onResendLink={onResendLink} />
}

PasswordRecovery.getLayout = (page: ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>
}

export default PasswordRecovery

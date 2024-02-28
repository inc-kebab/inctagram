import { ReactElement } from 'react'

import { useLoginMutation } from '@/feature/auth/api/auth-api'
import { Github, Google } from '@/shared/assets/icons/other'
import { Page } from '@/shared/types/layout'
import { Button } from '@/shared/ui/Button'
import { AuthLayout } from '@/widgets/layout'
import Link from 'next/link'

const SignIn: Page = () => {
  const [login] = useLoginMutation()

  const handleLogin = () => {
    login()
  }

  return (
    <ul
      style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        justifyContent: 'center',
        listStyle: 'none',
      }}
    >
      <li>
        <Button onClick={handleLogin}>Login</Button>
      </li>
      <li>
        <Button
          asComponent={Link}
          href={process.env.NEXT_PUBLIC_BACK_API_STAGE + '/auth/google/login'}
          style={{ padding: 0 }}
          variant="text"
        >
          <Google />
        </Button>
      </li>
      <li>
        <Button
          asComponent={Link}
          href={process.env.NEXT_PUBLIC_BACK_API_STAGE + '/auth/github/login'}
          style={{ padding: 0 }}
          variant="text"
        >
          <Github />
        </Button>
      </li>
    </ul>
  )
}

SignIn.getLayout = (page: ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>
}

export default SignIn

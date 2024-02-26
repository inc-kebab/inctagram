import { Github } from '@/shared/assets/icons/other'
import { Button } from '@/shared/ui/Button'
import { signIn } from 'next-auth/react'

export const GithubAuthButton = () => {
  const handleLogin = () => signIn('github', { callbackUrl: '/profile' })

  return (
    <Button onClick={handleLogin} variant="text">
      <Github />
    </Button>
  )
}

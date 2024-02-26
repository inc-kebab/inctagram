import { Google } from '@/shared/assets/icons/other'
import { Button } from '@/shared/ui/Button'
import { signIn } from 'next-auth/react'

export const GoogleAuthButton = () => {
  const handleLogin = async () => {
    const res = await signIn('google', { callbackUrl: '/profile' })

    if (res?.status === 200) {
      alert('blabla')
    }
  }

  return (
    <Button onClick={handleLogin} variant="text">
      <Google />
    </Button>
  )
}

import { Button } from '@/shared/ui/Button'
import { Typography } from '@/shared/ui/Typography'
import Image from 'next/image'

import s from './EmailVerification.module.scss'

interface Props {
  onResendLink?: () => void
}
export const EmailVerificationBlock = ({ onResendLink }: Props) => {
  return (
    <section className={s.wrapper}>
      <Typography asComponent="h1" className={s.title} textAlign="center" variant="h1">
        Email verification link expired
      </Typography>
      <Typography className={s.text} textAlign="center" variant="regular16">
        Looks like the verification link has expired. Not to worry, we can send the link again
      </Typography>
      <Button className={s.button} onClick={onResendLink}>
        Resend verification link
      </Button>
      <Image
        alt="Email verification"
        className={s.image}
        height={0}
        src="/email-verification.svg"
        width={0}
      />
    </section>
  )
}

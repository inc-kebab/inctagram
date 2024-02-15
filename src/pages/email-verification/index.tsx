import { Button } from '@/shared/ui/Button'
import { Typography } from '@/shared/ui/Typography'
import Image from 'next/image'

import s from './EmailVerification.module.scss'

const EmailVerification = () => {
  return (
    <section className={s.wrapper}>
      <Typography as="h1" className={s.title} textAlign="center" variant="h1">
        Email verification link expired
      </Typography>
      <Typography className={s.text} textAlign="center" variant="regular16">
        Looks like the verification link has expired. Not to worry, we can send the link again
      </Typography>
      <Button className={s.button}>Resend verification link</Button>
      <div className={s.imageWrapper}>
        <Image alt="Email verification" fill objectFit="cover" src="/email-verification.svg" />
      </div>
    </section>
  )
}

export default EmailVerification

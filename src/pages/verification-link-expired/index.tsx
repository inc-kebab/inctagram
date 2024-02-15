import { Button } from '@/shared/ui/Button'
import { Typography } from '@/shared/ui/Typography'
import Image from 'next/image'

import s from './index.module.scss'

const VerificationLinkExpired = () => {
  return (
    <section className={s.wrapper}>
      <Typography className={s.title} textAlign="center" variant="h1">
        Email verification link expired
      </Typography>
      <Typography textAlign="center" variant="regular16">
        Looks like the verification link has expired. Not to worry, we can send the link again
      </Typography>
      <Button>Resend verification link</Button>
      <div>
        <Image
          alt="Verification link expired"
          height={352}
          objectFit="cover"
          src="/verification-link-expired.svg"
          width={473}
        />
      </div>
    </section>
  )
}

export default VerificationLinkExpired

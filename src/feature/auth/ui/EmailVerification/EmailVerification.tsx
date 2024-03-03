import { useTranslation } from '@/shared/hooks/useTranslation'
import { Button } from '@/shared/ui/Button'
import { Typography } from '@/shared/ui/Typography'
import Image from 'next/image'

import s from './EmailVerification.module.scss'

interface Props {
  disabled?: boolean
  onResendLink?: () => void
}

export const EmailVerificationBlock = ({ disabled, onResendLink }: Props) => {
  const { t } = useTranslation()

  return (
    <section className={s.wrapper}>
      <Typography asComponent="h1" className={s.title} textAlign="center" variant="h1">
        {t.pages.emailVerification.title}
      </Typography>
      <Typography className={s.text} textAlign="center" variant="regular16">
        {t.pages.emailVerification.description}
      </Typography>
      <Button className={s.button} disabled={disabled} onClick={onResendLink}>
        {t.button.resendVerificationLink}
      </Button>
      <Image
        alt="Email verification"
        className={s.image}
        height={0}
        sizes="473px"
        src="/assets/images/email-verification.png"
        width={0}
      />
    </section>
  )
}

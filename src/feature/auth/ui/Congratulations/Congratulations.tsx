import { AuthRoutes } from '@/shared/const/routes'
import { useTranslation } from '@/shared/hooks'
import { Button } from '@/shared/ui/Button'
import { Typography } from '@/shared/ui/Typography'
import Image from 'next/image'
import Link from 'next/link'

import s from './Congratulations.module.scss'

export const Congratulations = () => {
  const { t } = useTranslation()

  return (
    <section className={s.wrapper}>
      <Typography asComponent="h1" className={s.title} textAlign="center" variant="h1">
        {t.pages.congratulations.title}
      </Typography>
      <Typography textAlign="center" variant="regular16">
        {t.pages.congratulations.description}
      </Typography>
      <Button asComponent={Link} className={s.button} href={AuthRoutes.SIGN_IN}>
        {t.button.signIn}
      </Button>
      <Image
        alt="Congratulation image"
        className={s.image}
        height={0}
        sizes="473px"
        src="/assets/images/congratulations.png"
        width={0}
      />
    </section>
  )
}

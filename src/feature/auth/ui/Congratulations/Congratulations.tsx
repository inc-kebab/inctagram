import img from '@/../public/congratulations.png'
import { Button } from '@/shared/ui/Button'
import { Typography } from '@/shared/ui/Typography'
import Image from 'next/image'
import Link from 'next/link'

import s from './Congratulations.module.scss'

export const Congratulations = () => {
  return (
    <section className={s.wrapper}>
      <Typography asComponent="h1" className={s.title} variant="h1">
        Congratulations!
      </Typography>
      <Typography asComponent="p" className={s.text} textAlign="center" variant="regular16">
        Your email has been confirmed
      </Typography>
      <Button asComponent={Link} className={s.button} href="/auth/sign-in">
        Sign in
      </Button>
      <Image alt="Congratulation image" className={s.image} height={0} src={img} width={0} />
    </section>
  )
}

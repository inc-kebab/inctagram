'use client'
import { useEffect, useState } from 'react'

import { Button } from '@/shared/ui/Button'
import { Typography } from '@/shared/ui/Typography'
import Image from 'next/image'

import s from './EmailVerification.module.scss'

function useWindowDimensions() {
  const [currentWidth, setCurrentWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  )

  useEffect(() => {
    function handleResize() {
      setCurrentWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return currentWidth
}

const EmailVerification = () => {
  const width = useWindowDimensions()

  return (
    <section className={s.wrapper}>
      <Typography className={s.title} textAlign="center" variant={width > 700 ? 'h1' : 'regular16'}>
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

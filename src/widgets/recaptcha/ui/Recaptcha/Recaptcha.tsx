import { useEffect, useRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import clsx from 'clsx'
import { useRouter } from 'next/router'

import s from './Recaptcha.module.scss'

type Props = {
  className?: string
  error?: string
  isError?: boolean
  onChange?: (key: null | string) => void
}

export type ControlledRecaptchaProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<Props, 'id'>

export const Recaptcha = <T extends FieldValues>({
  className,
  control,
  error,
  isError,
  name,
}: ControlledRecaptchaProps<T>) => {
  const { locale } = useRouter()

  const recaptchaRef = useRef<ReCAPTCHA | null>(null)

  const {
    field: { onChange, ref },
  } = useController({
    control,
    name,
  })

  useEffect(() => {
    if (isError && recaptchaRef.current) {
      recaptchaRef.current.reset()
    }
  }, [isError])

  return (
    <div className={clsx(s.recaptchaContainer, className)}>
      <ReCAPTCHA
        hl={locale || 'en'}
        onChange={onChange}
        ref={recaptchaRef}
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY!}
        size="normal"
        theme="dark"
      />
      <label className={s.errorText}>{error}</label>
    </div>
  )
}

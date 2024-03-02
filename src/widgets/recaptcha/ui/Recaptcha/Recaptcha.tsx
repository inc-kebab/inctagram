import ReCAPTCHA from 'react-google-recaptcha'
import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { useRouter } from 'next/router'

import s from './Recaptcha.module.scss'

type Props = {
  error?: string
  onChange?: (key: null | string) => void
}

export type ControlledRecaptchaProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<Props, 'id'>

export const Recaptcha = <T extends FieldValues>({
  control,
  error,
  name,
}: ControlledRecaptchaProps<T>) => {
  const { locale } = useRouter()

  const {
    field: { onChange },
  } = useController({
    control,
    name,
  })

  return (
    <div className={s.recaptchaContainer}>
      <ReCAPTCHA
        hl={locale || 'en'}
        onChange={onChange}
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY!}
        size="normal"
        theme="dark"
      />
      <label className={s.errorText}>{error}</label>
    </div>
  )
}

import { useTranslation } from '@/shared/hooks/useTranslation'
import clsx from 'clsx'

import s from './Notification.module.scss'

type NotificationContent =
  | {
      error: string
      success?: never
    }
  | {
      error?: never
      success: string
    }

type Props = {
  className?: string
} & NotificationContent

export const Notification = ({ className, error, success }: Props) => {
  const finallyClass = clsx(s.notification, { [s.error]: error }, className)
  const { t } = useTranslation()

  return (
    <div className={finallyClass}>
      {error ? (
        <>
          <span className={s.titleError}>{t.validation.error}</span>
          <span>{error}</span>
        </>
      ) : (
        success
      )}
    </div>
  )
}

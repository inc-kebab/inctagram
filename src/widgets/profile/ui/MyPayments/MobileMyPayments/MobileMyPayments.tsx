import { GetMyPaymentsResponse } from '@/feature/profile/model/types/profile.types'
import { useTranslation } from '@/shared/hooks'
import { Typography } from '@/shared/ui/Typography'
import clsx from 'clsx'
import { format } from 'date-fns'

import s from './MobileMyPayments.module.scss'

type Props = {
  className: string
  myPayments: GetMyPaymentsResponse[]
}
export const MobileMyPayments = ({ className, myPayments }: Props) => {
  const { t } = useTranslation()

  return (
    <div className={clsx(s.container, className)}>
      {myPayments.map(el => {
        const dateOfPayments = format(new Date(el.dateOfPayments), 'dd.MM.yyyy')
        const endDateOfSubscription = format(new Date(el.endDateOfSubscription), 'dd.MM.yyyy')

        return (
          <div className={s.card} key={el.id}>
            <div className={s.row}>
              <Typography asComponent="h3" variant="regular14">
                {t.pages.myPayments.dateOfPayment}
              </Typography>
              <Typography asComponent="span" variant="h3">
                {dateOfPayments}
              </Typography>
            </div>
            <div className={s.row}>
              <Typography asComponent="h3" variant="regular14">
                {t.pages.myPayments.endDateOfSubscription}
              </Typography>
              <Typography asComponent="span" variant="h3">
                {endDateOfSubscription}
              </Typography>
            </div>
            <div className={s.row}>
              <Typography asComponent="h3" variant="regular14">
                {t.pages.myPayments.subscriptionType}
              </Typography>
              <Typography asComponent="span" variant="h3">
                {el.subscriptionType}
              </Typography>
            </div>
            <div className={s.row}>
              <Typography asComponent="h3" variant="regular14">
                {t.pages.myPayments.price}
              </Typography>
              <Typography asComponent="span" variant="h3">
                {el.price}
              </Typography>
            </div>
            <div className={s.row}>
              <Typography asComponent="h3" variant="regular14">
                {t.pages.myPayments.paymentType}
              </Typography>
              <Typography asComponent="span" variant="h3">
                {el.paymentType}
              </Typography>
            </div>
          </div>
        )
      })}
    </div>
  )
}

import { ContentWrapper } from '@/feature/payment'
import { Paypal, Stripe } from '@/shared/assets/icons/other'
import { useTranslation } from '@/shared/hooks'
import { RadioGroup, RadioOption } from '@/shared/ui/RadioGroup'
import { Typography } from '@/shared/ui/Typography'

import s from './AccountManagement.module.scss'

export const AccountManagement = () => {
  const { t } = useTranslation()

  const accountTypeOptions: RadioOption[] = [
    { label: t.label.personal, value: t.label.personal },
    { label: t.label.business, value: t.label.business },
  ]

  const subscriptionOptions: RadioOption[] = [
    { label: '1$', value: '1' },
    { label: '7$', value: '7' },
    { label: '30$', value: '30' },
    { label: '365$', value: '365' },
  ]

  return (
    <div className={s.root}>
      <ContentWrapper className={s.current} title={t.label.currentSubscription}>
        <div className={s.table}>
          <Typography className={s.titleCell} variant="regular14">
            {t.label.expireAt}
          </Typography>
          <Typography className={s.titleCell} variant="regular14">
            {t.label.nextPayment}
          </Typography>
          <Typography className={s.dataCell} variant="regular14">
            12.12.2024
          </Typography>
          <Typography className={s.dataCell} variant="regular14">
            13.13.2023
          </Typography>
        </div>
      </ContentWrapper>
      <ContentWrapper className={s.type} title={t.label.accountType}>
        <RadioGroup options={accountTypeOptions} />
      </ContentWrapper>
      <ContentWrapper className={s.sub} title={t.label.changeSubscription}>
        <RadioGroup options={subscriptionOptions} />
      </ContentWrapper>
      <div className={s.payment}>
        <Paypal className={s.icon} />
        <div className={s.between}>Or</div>
        <Stripe className={s.icon} />
      </div>
    </div>
  )
}

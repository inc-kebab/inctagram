import { ContentWrapper } from '@/feature/payment'
import { Paypal, Stripe } from '@/shared/assets/icons/other'
import { RadioGroup, RadioOption } from '@/shared/ui/RadioGroup'
import { Typography } from '@/shared/ui/Typography'

import s from './AccountManagement.module.scss'

export const AccountManagement = () => {
  const accountTypeOptions: RadioOption[] = [
    { label: 'Personal', value: 'Personal' },
    { label: 'Business', value: 'Business' },
  ]

  const subscriptionOptions: RadioOption[] = [
    { label: '1$', value: '1' },
    { label: '7$', value: '7' },
    { label: '30$', value: '30' },
    { label: '365$', value: '365' },
  ]

  return (
    <div className={s.root}>
      <ContentWrapper className={s.current} title="Current Subscription:">
        <div className={s.table}>
          <Typography className={s.titleCell} variant="regular14">
            Expire at
          </Typography>
          <Typography className={s.titleCell} variant="regular14">
            Next payment
          </Typography>
          <Typography className={s.dataCell} variant="regular14">
            12.12.2024
          </Typography>
          <Typography className={s.dataCell} variant="regular14">
            13.13.2023
          </Typography>
        </div>
      </ContentWrapper>
      <ContentWrapper className={s.type} title="Account type:">
        <RadioGroup options={accountTypeOptions} />
      </ContentWrapper>
      <ContentWrapper className={s.sub} title="Change your subscription:">
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

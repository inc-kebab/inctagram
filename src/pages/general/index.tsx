import { Paypal, Stripe } from '@/shared/assets/icons/other'
import { Card } from '@/shared/ui/Card'
import { RadioGroup } from '@/shared/ui/RadioGroup'
import { RadioOption } from '@/shared/ui/RadioGroup/RadioGroup'

import s from './general.module.scss'

const General = () => {
  const data = [
    { label: 'Business', value: 'Business' },
    { label: 'Personal', value: 'Personal' },
  ]

  return (
    <div className={s.block}>
      <AccountRadioGroup data={data} title="Account type:" />
      <AccountRadioGroup data={data} title="Your subscription costs:" />
      <div>
        <div className={s.payment}>
          <Paypal className={s.icon} />
          <div className={s.between}>Or</div>
          <Stripe className={s.icon} />
        </div>
      </div>
    </div>
  )
}

export default General
type Props = {
  data: RadioOption[]
  title?: string
}

const AccountRadioGroup = ({ data, title }: Props) => {
  return (
    <>
      <p className={s.title}>{title}</p>
      <Card className={s.radioBlock}>
        <RadioGroup options={data} />
      </Card>
    </>
  )
}

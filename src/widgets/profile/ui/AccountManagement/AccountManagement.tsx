import { useState } from 'react'

import { SignInFormValues } from '@/feature/auth'
import {
  useGetListOfSubscriptionsQuery,
  useGetMyPaymentsQuery,
  usePurchaseSubscriptionMutation,
} from '@/feature/profile/api/account-api'
import { PurchaseParams } from '@/feature/profile/model/types/profile.types'
import { handleErrorResponse } from '@/shared/helpers'
import { Button } from '@/shared/ui/Button'
import { Card } from '@/shared/ui/Card'
import { RadioGroup } from '@/shared/ui/RadioGroup'

import s from './AccountManagement.module.scss'

export const AccountManagement = () => {
  const { data: listOfSubscriptions, isLoading } = useGetListOfSubscriptionsQuery()
  const { data: myPayments } = useGetMyPaymentsQuery()
  const [purchase] = usePurchaseSubscriptionMutation()
  const [productPriceId, setProductPriceId] = useState<null | string>(null)

  const radioOptions = listOfSubscriptions?.map(option => {
    return { label: `${option.price} $ per ${option.interval}`, value: option.productPriceId }
  })

  const handleValueChange = (value: string) => {
    setProductPriceId(value)
  }
  const handlePaymentSystemChange = (paymentSystem: PurchaseParams['paymentSystem']) => {
    if (productPriceId) {
      purchase({ paymentSystem, productPriceId }).then(result => {
        if ('data' in result) {
          window.open(result.data.url, '_blank') // в новом окне

          // window.location.href = result.data.url // в текущем окне
        }
        if ('error' in result) {
          handleErrorResponse<SignInFormValues>(result.error)
        }
      })
    }
  }

  return (
    <>
      <Card className={s.wrapper}>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <RadioGroup onValueChange={handleValueChange} options={radioOptions || []} />
        )}
      </Card>

      <div className={s.buttonWrapper}>
        <Button
          disabled={productPriceId == null}
          onClick={() => handlePaymentSystemChange('Paypal')}
        >
          Paypal
        </Button>
        <span>or</span>
        <Button
          disabled={productPriceId == null}
          onClick={() => handlePaymentSystemChange('Stripe')}
        >
          Stripe
        </Button>
      </div>
    </>
  )
}

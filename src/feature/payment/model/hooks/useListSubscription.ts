import { useEffect, useState } from 'react'

import { handleErrorResponse } from '@/shared/helpers'
import { RadioOption } from '@/shared/ui/RadioGroup'

import {
  useGetListOfSubscriptionsQuery,
  usePurchaseSubscriptionMutation,
} from '../../api/account-api'
import { PaymentSystem } from '../types/payment.types'

export const useListSubscription = () => {
  const { data: listOfSubs, isLoading: isGetSubsLoad } = useGetListOfSubscriptionsQuery()

  const [productPriceId, setProductPriceId] = useState<string | undefined>(undefined)

  const handleChangeProductPriceId = (value: string) => {
    setProductPriceId(value)
  }

  const [purchase] = usePurchaseSubscriptionMutation()

  const handlePayment = (paymentSystem: PaymentSystem) => () => {
    if (productPriceId) {
      purchase({ paymentSystem, productPriceId }).then(result => {
        if ('data' in result) {
          window.location.href = result.data.url
        }
        if ('error' in result) {
          handleErrorResponse(result.error)
        }
      })
    }
  }

  const subsOptions: RadioOption[] | undefined = listOfSubs?.map(option => {
    return { label: `${option.price} $ per ${option.interval}`, value: option.productPriceId }
  })

  useEffect(() => {
    if (listOfSubs) {
      setProductPriceId(listOfSubs?.[0].productPriceId)
    }
  }, [listOfSubs])

  return {
    handleChangeProductPriceId,
    handlePayment,
    isGetSubsLoad,
    productPriceId,
    subsOptions,
  }
}

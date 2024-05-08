import { PaymentSystem } from './payment.types'

export type Subscription = {
  id: number
  interval: string
  paypalPlanId: string
  period: number
  price: number
  productPriceId: string
  subscriptionPriceId: string
}

interface MyPayment {
  dateOfPayments: string
  endDateOfSubscription: string
  id: number
  paymentType: string
  price: number
  subscriptionType: string
  userId: number
}

export type GetMyPaymentsResponse = {
  items: MyPayment[]
  pageNumber: number
  pageSize: number
  pagesCount: number
  totalCount: number
}

export type PurchaseParams = {
  paymentSystem: PaymentSystem
  productPriceId: string
}

type ActiveSubscription = {
  autoRenewal: boolean
  dateOfNextPayment: string
  dateOfSubscribe: string
  interval: string
  paymentSystem: string
  paypalSubscriptionId: Nullable<string>
  period: number
  productPriceId: string
  profileUserId: Nullable<number>
  stripeSubscriptionId: Nullable<string>
  subscriptionId: number
  subscriptionPriceId: string
  /*subscriptionStatus: string*/
  userId: number
}

export type CurrentSubscription = {
  expireAt: string
  nextPayment?: string
  subscription?: ActiveSubscription
}

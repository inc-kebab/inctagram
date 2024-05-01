import { baseApi } from '@/shared/api'

import {
  CurrentSubscription,
  GetMyPaymentsResponse,
  PurchaseParams,
  Subscription,
} from '../model/types/api.types'

const accountAPI = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCurrentSubscription: builder.query<CurrentSubscription, void>({
      query: () => ({ url: '/subscription/current' }),
    }),
    getListOfSubscriptions: builder.query<Subscription[], void>({
      query: () => ({ url: '/subscription/products' }),
      transformResponse: (res: Subscription[]) => res.sort((a, b) => a.period - b.period),
    }),
    getMyPayments: builder.query<GetMyPaymentsResponse[], void>({
      query: () => ({ url: '/subscription/my-payments' }),
    }),
    purchaseSubscription: builder.mutation<{ url: string }, PurchaseParams>({
      query: body => ({ body, method: 'POST', url: '/subscription/purchase' }),
    }),
  }),
})

export const {
  useGetCurrentSubscriptionQuery,
  useGetListOfSubscriptionsQuery,
  useGetMyPaymentsQuery,
  usePurchaseSubscriptionMutation,
} = accountAPI

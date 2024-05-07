import { baseApi } from '@/shared/api'

import {
  CurrentSubscription,
  GetMyPaymentsResponse,
  PurchaseParams,
  Subscription,
} from '../model/types/api.types'

const accountAPI = baseApi.injectEndpoints({
  endpoints: builder => ({
    autoRenewal: builder.mutation<string, { autoRenewal: boolean; subscriptionId: number }>({
      invalidatesTags: (_, error) => (error ? [] : ['autoRenewal']),
      query: body => ({
        body,
        method: 'PUT',
        responseHandler: 'text',
        url: '/subscription/auto-renewal',
      }),
    }),
    getCurrentSubscription: builder.query<CurrentSubscription, void>({
      providesTags: ['autoRenewal'],
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
  useAutoRenewalMutation,
  useGetCurrentSubscriptionQuery,
  useGetListOfSubscriptionsQuery,
  useGetMyPaymentsQuery,
  usePurchaseSubscriptionMutation,
} = accountAPI

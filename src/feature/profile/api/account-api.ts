import {
  GetListOfSubscriptionsResponse,
  GetMyPaymentsResponse,
  PurchaseParams,
} from '@/feature/profile/model/types/profile.types'
import { baseApi } from '@/shared/api'

const accountAPI = baseApi.injectEndpoints({
  endpoints: builder => ({
    getListOfSubscriptions: builder.query<GetListOfSubscriptionsResponse[], void>({
      query: () => ({ url: '/subscription/products' }),
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
  useGetListOfSubscriptionsQuery,
  useGetMyPaymentsQuery,
  usePurchaseSubscriptionMutation,
} = accountAPI

import { baseApi } from '@/shared/api/base-api'

import { GetTotalUsersResponse } from '../model/types/profile.types'

export const publicProfileApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getTotalUsersCount: builder.query<GetTotalUsersResponse, void>({
      query: () => ({ url: '/public-profile/total' }),
    }),
  }),
})

export const { getTotalUsersCount } = publicProfileApi.endpoints
export const { useGetTotalUsersCountQuery } = publicProfileApi

import { baseApi } from '@/shared/api'

import { GetProfileResponse, GetTotalUsersResponse } from '../model/types/profile.types'

export const publicProfileApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getPublicProfile: builder.query<GetProfileResponse, number>({
      query: userId => ({ url: `/public-profile/${userId}` }),
    }),
    getTotalUsersCount: builder.query<GetTotalUsersResponse, void>({
      query: () => ({ url: '/public-profile/total' }),
    }),
  }),
})

export const { getPublicProfile, getTotalUsersCount } = publicProfileApi.endpoints
export const { useGetPublicProfileQuery, useGetTotalUsersCountQuery } = publicProfileApi

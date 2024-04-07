import { GetPublicProfileResponse } from '@/feature/public-profile/model/types/public-profile.types'
import { baseApi } from '@/shared/api/base-api'

export const publicProfileApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getTotalProfileCount: builder.query<GetPublicProfileResponse, void>({
      query: () => ({ url: '/public-profile/total' }),
    }),
  }),
})

export const { getTotalProfileCount } = publicProfileApi.endpoints
export const { useGetTotalProfileCountQuery } = publicProfileApi

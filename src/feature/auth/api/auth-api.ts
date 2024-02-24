import { baseApi } from '@/shared/api/base-api'

import { MeResponse } from '../model/types/api.types'

const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    me: builder.query<MeResponse, void>({
      query: () => ({ url: '/auth/me' }),
    }),
  }),
})

export const { useMeQuery } = authApi

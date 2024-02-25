import { baseApi } from '@/shared/api/base-api'

import { LoginParams, MeResponse } from '../model/types/api.types'

const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<void, LoginParams>({
      query: body => ({
        body,
        method: 'POST',
        url: '/auth/login',
      }),
    }),
    me: builder.query<MeResponse, void>({
      query: () => ({ url: '/auth/me' }),
    }),
  }),
})

export const { useLoginMutation, useMeQuery } = authApi

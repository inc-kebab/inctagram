import { baseApi } from '@/shared/api/base-api'

import { MeResponse } from '../model/types/api.types'

const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<{ accessToken: string }, void>({
      query: () => ({
        body: {
          email: 'example@gmail.com',
          password: 'Pa$$w0rD',
        },
        method: 'POST',
        url: '/auth/login',
      }),
    }),
    loginGoogle: builder.query<{ accessToken: string }, void>({
      query: () => ({ url: '/auth/google/login' }),
    }),
    me: builder.query<MeResponse, void>({
      query: () => ({ url: '/auth/me' }),
    }),
  }),
})

export const { useLazyLoginGoogleQuery, useLoginMutation, useMeQuery } = authApi

import { baseApi } from '@/shared/api/base-api'

import { LoginArgs, LoginResponse, MeResponse } from '../model/types/api.types'

const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<LoginResponse, LoginArgs>({
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled

          // setCookie('accessToken', data.accessToken)
        } catch {
          // deleteCookie('accessToken')
        }
      },
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

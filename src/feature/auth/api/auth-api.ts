import { baseApi } from '@/shared/api/base-api'

import { MeResponse } from '../model/types/api.types'

const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<{ accessToken: string }, void>({
      invalidatesTags: ['me'],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled

          localStorage.setItem('accessToken', data.accessToken)
        } catch {
          localStorage.removeItem('accessToken')
        }
      },
      query: () => ({
        body: {
          email: 'example@gmail.com',
          password: 'Pa$$w0rD',
        },
        method: 'POST',
        url: '/auth/login',
      }),
    }),
    me: builder.query<MeResponse, void>({
      providesTags: ['me'],
      query: () => ({ url: '/auth/me' }),
    }),
  }),
})

export const { useLoginMutation, useMeQuery } = authApi

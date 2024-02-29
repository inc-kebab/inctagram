import { baseApi } from '@/shared/api/base-api'

import { MeResponse, NewPassword, RecoveryPassword } from '../model/types/api.types'

const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    me: builder.query<MeResponse, void>({
      query: () => ({ url: '/auth/me' }),
    }),
    newPassword: builder.mutation<unknown, NewPassword>({
      query: data => ({
        body: data,
        method: 'POST',
        url: '/auth/new-password',
      }),
    }),
    recoveryPassword: builder.mutation<unknown, RecoveryPassword>({
      query: data => ({
        body: data,
        method: 'POST',
        url: '/auth/password-recovery',
      }),
    }),
  }),
})

export const { useMeQuery, useNewPasswordMutation, useRecoveryPasswordMutation } = authApi

import { baseApi } from '@/shared/api/base-api'

import {
  ConfirmEmailArgs,
  MeResponse,
  ResendArgs,
  SignUpArgs,
  SignUpResponse,
} from '../model/types/api.types'

const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    confirmEmail: builder.mutation<void, ConfirmEmailArgs>({
      query: confirmationCode => ({
        body: { confirmationCode },
        method: 'POST',
        url: '/auth/registration-confirmation',
      }),
    }),
    me: builder.query<MeResponse, void>({
      query: () => ({ url: '/auth/me' }),
    }),
    resendRegLink: builder.mutation<void, ResendArgs>({
      query: email => ({
        body: email,
        method: 'POST',
        url: '/auth/registration-email-resending',
      }),
    }),
    signUp: builder.mutation<SignUpResponse, SignUpArgs>({
      query: body => ({
        body,
        method: 'POST',
        url: '/auth/registration',
      }),
    }),
  }),
})

export const { useConfirmEmailMutation, useMeQuery, useResendRegLinkMutation, useSignUpMutation } =
  authApi

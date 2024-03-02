import { baseApi } from '@/shared/api/base-api'

import {
  ConfirmEmailArgs,
  LoginArgs,
  LoginResponse,
  MeResponse,
  NewPasswordArgs,
  RecoveryPasswordArgs,
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
    newPassword: builder.mutation<void, NewPasswordArgs>({
      query: data => ({
        body: data,
        method: 'POST',
        url: '/auth/new-password',
      }),
    }),
    recoveryPassword: builder.mutation<void, RecoveryPasswordArgs>({
      query: data => ({
        body: data,
        method: 'POST',
        url: '/auth/password-recovery',
      }),
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

export const {
  useConfirmEmailMutation,
  useLoginMutation,
  useMeQuery,
  useNewPasswordMutation,
  useRecoveryPasswordMutation,
  useResendRegLinkMutation,
  useSignUpMutation,
} = authApi

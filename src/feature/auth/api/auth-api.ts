import { baseApi } from '@/shared/api/base-api'

import {
  ConfirmEmailArgs,
  LoginArgs,
  LoginResponse,
  MeResponse,
  ResendArgs,
  SignUpArgs,
  SignUpResponse,
  NewPassword,
  RecoveryPassword
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
  useResendRegLinkMutation,
  useSignUpMutation,
  useNewPasswordMutation,
  useRecoveryPasswordMutation
} = authApi

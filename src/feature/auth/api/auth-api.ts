import { baseApi } from '@/shared/api/base-api'
import { deleteCookie, setCookie } from 'cookies-next'

import {
  CheckRecoveryCodeArgs,
  ConfirmEmailArgs,
  Email,
  LoginArgs,
  LoginResponse,
  MeResponse,
  NewPasswordArgs,
  RecoveryPasswordArgs,
  SignUpArgs,
} from '../model/types/api.types'

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    checkRecoveryCode: builder.mutation<Email, CheckRecoveryCodeArgs>({
      query: body => ({
        body,
        method: 'POST',
        url: '/auth/check-recovery-code',
      }),
    }),
    confirmEmail: builder.mutation<void, ConfirmEmailArgs>({
      query: body => ({
        body,
        method: 'POST',
        url: '/auth/registration-confirmation',
      }),
    }),
    login: builder.mutation<LoginResponse, LoginArgs>({
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled

          setCookie('accessToken', data.accessToken, { maxAge: 30 * 60 }) // 30min
        } catch {
          deleteCookie('accessToken')
        }
      },
      query: body => ({
        body,
        method: 'POST',
        url: '/auth/login',
      }),
    }),
    logout: builder.mutation<void, void>({
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          deleteCookie('accessToken')
          dispatch(baseApi.util.resetApiState())
        } catch (e) {
          console.log(e)
        }
      },
      query: () => {
        return {
          method: 'POST',
          url: 'auth/logout',
        }
      },
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
    resendRecoveryPassword: builder.mutation<void, Email>({
      query: body => ({
        body,
        method: 'POST',
        url: '/auth/resend-recovery-code',
      }),
    }),
    resendRegLink: builder.mutation<void, Email>({
      query: email => ({
        body: email,
        method: 'POST',
        url: '/auth/registration-email-resending',
      }),
    }),
    signUp: builder.mutation<Email, SignUpArgs>({
      query: body => ({
        body,
        method: 'POST',
        url: '/auth/registration',
      }),
    }),
  }),
})

export const {
  useCheckRecoveryCodeMutation,
  useConfirmEmailMutation,
  useLazyMeQuery,
  useLoginMutation,
  useLogoutMutation,
  useMeQuery,
  useNewPasswordMutation,
  useRecoveryPasswordMutation,
  useResendRecoveryPasswordMutation,
  useResendRegLinkMutation,
  useSignUpMutation,
} = authApi

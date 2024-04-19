import { accessCookieParams } from '@/shared/const/cookie'
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from '@reduxjs/toolkit/query'
import { Mutex } from 'async-mutex'
import { deleteCookie, getCookie, setCookie } from 'cookies-next'
import { Context } from 'next-redux-wrapper'

const isNotServer = typeof window !== 'undefined'

const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_API,
  credentials: 'include',
  prepareHeaders: (headers, { extra }) => {
    if (isNotServer) {
      const accessTokenFront = getCookie('accessToken')
      const currentLangFront = getCookie('NEXT_LOCALE')

      if (accessTokenFront) {
        headers.set('Authorization', `Bearer ${accessTokenFront}`)
      }

      if (currentLangFront) {
        headers.set('X-Url-lang', currentLangFront)
      }
    } else {
      const context = extra as Context | undefined

      const isContextReqExist = context && 'req' in context

      if (isContextReqExist && context.req && 'cookies' in context.req) {
        const token = context.req.cookies.accessToken
        const refresh = context.req.cookies.refreshToken

        token && headers.set('Authorization', `Bearer ${token}`)
        refresh && headers.set('Cookie', `refreshToken=${refresh}`)
      }

      if (context && 'locale' in context) {
        const lang = context.locale

        lang && headers.set('X-Url-lang', lang)
      }
    }

    return headers
  },
})

export const baseQueryWithReauth: BaseQueryFn<
  FetchArgs | string,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock()

  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()

      const refreshResult = await baseQuery(
        { method: 'POST', url: '/auth/update-token' },
        api,
        extraOptions
      )

      if (refreshResult.meta?.response?.status === 200) {
        const data = refreshResult.data as { accessToken: string }

        if (isNotServer) {
          setCookie('accessToken', data.accessToken, accessCookieParams)
        } else {
          const context = api.extra as Context | undefined

          const isContextReqExist = context && 'req' in context

          if (isContextReqExist && context.req && 'cookies' in context.req) {
            const accessTokenCookie = `accessToken=${data.accessToken}; Max-Age=1800; Path=/; Secure; SameSite=None`
            const refreshTokenCookie = refreshResult.meta.response.headers.getSetCookie()

            context.res?.setHeader('Set-cookie', [...refreshTokenCookie, accessTokenCookie])
            context.req.cookies.accessToken = data.accessToken
          }
        }

        result = await baseQuery(args, api, extraOptions)
      } else {
        deleteCookie('accessToken')
      }
      release()
    } else {
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }

  return result
}

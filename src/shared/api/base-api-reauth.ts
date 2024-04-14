import { BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from '@reduxjs/toolkit/query'
import { Mutex } from 'async-mutex'
import { deleteCookie, getCookie, setCookie } from 'cookies-next'
import { Context } from 'next-redux-wrapper'

const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_API,
  credentials: 'include',
  prepareHeaders: (headers, { extra }) => {
    if (typeof window !== 'undefined') {
      const accessTokenFront = getCookie('accessToken')
      const currentLangFront = getCookie('NEXT_LOCALE')

      if (accessTokenFront) {
        headers.set('Authorization', `Bearer ${accessTokenFront}`)
      }

      if (currentLangFront) {
        headers.set('X-Url-lang', currentLangFront)
      }
    } else {
      const ctx = extra as Context | undefined

      const isCtxWithReqExist = ctx && 'req' in ctx

      if (isCtxWithReqExist && ctx.req && 'cookies' in ctx.req) {
        const token = ctx.req.cookies.accessToken

        token && headers.set('Authorization', `Bearer ${token}`)
      }

      if (ctx && 'locale' in ctx) {
        const lang = ctx.locale

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
      // try to get a new token
      const refreshResult = await baseQuery(
        { method: 'POST', url: '/auth/update-token' },
        api,
        extraOptions
      )

      if (refreshResult.meta?.response?.status === 200) {
        // set token to LS
        const data = refreshResult.data as { accessToken: string }

        setCookie('accessToken', data.accessToken, { maxAge: 30 * 60 }) // 30min

        // retry the initial query
        result = await baseQuery(args, api, extraOptions)
      } else {
        deleteCookie('accessToken')
      }
      release()
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }

  return result
}

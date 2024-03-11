import { BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from '@reduxjs/toolkit/query'
import { Mutex } from 'async-mutex'
import { deleteCookie, getCookie, setCookie } from 'cookies-next'

const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_API,
  credentials: 'include',
  prepareHeaders: headers => {
    const accessToken = getCookie('accessToken')

    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`)
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

        setCookie('accessToken', data.accessToken)

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

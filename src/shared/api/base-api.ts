import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithReauth } from './base-api-reauth'

export const baseApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  reducerPath: 'baseApi',
  tagTypes: ['me', 'profile', 'myPosts'],
})

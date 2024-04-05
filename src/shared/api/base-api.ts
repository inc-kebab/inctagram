import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import { AnyAction } from 'redux'

import { baseQueryWithReauth } from './base-api-reauth'

export const baseApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  extractRehydrationInfo(action: AnyAction, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  reducerPath: 'baseApi',
  tagTypes: ['me', 'profile', 'myPosts'],
})

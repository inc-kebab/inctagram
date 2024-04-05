import { baseApi } from '@/shared/api/base-api'

import { GetPublicPostsArgs, GetPublicPostsResponse } from '../model/types/public-posts.types'

export const publicPostsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getPublicPosts: builder.query<GetPublicPostsResponse, GetPublicPostsArgs>({
      query: ({ pageSize, sortDirection }) => ({
        url: `/public-posts/all?pageSize=${pageSize}&sortDirection=${sortDirection}`,
      }),
    }),
  }),
})

export const { getPublicPosts } = publicPostsApi.endpoints

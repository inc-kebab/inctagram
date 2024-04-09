import { baseApi } from '@/shared/api/base-api'

import { GetMyPostsArgs, GetMyPostsResponse } from '../model/types/api.types'

export const publicPostsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAllPublicPosts: builder.query<GetMyPostsResponse, GetMyPostsArgs>({
      query: ({ pageSize = 4, sortDirection = 'desc', ...rest }) => ({
        params: { pageSize, sortDirection, ...rest },
        url: `/public-posts/all`,
      }),
    }),
  }),
})

export const { getAllPublicPosts } = publicPostsApi.endpoints
export const { useGetAllPublicPostsQuery } = publicPostsApi

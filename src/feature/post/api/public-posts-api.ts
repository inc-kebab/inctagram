import { baseApi } from '@/shared/api/base-api'

import { GetAllPostsArgs, GetPostsArgs, GetPostsResponse } from '../model/types/api.types'

export const publicPostsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAllPublicPosts: builder.query<GetPostsResponse, GetPostsArgs>({
      query: ({ pageSize = 4, sortDirection = 'desc', ...rest }) => ({
        params: { pageSize, sortDirection, ...rest },
        url: `/public-posts/all`,
      }),
    }),
    getUsersPosts: builder.query<GetPostsResponse, GetAllPostsArgs>({
      forceRefetch({ currentArg, previousArg }) {
        return (
          currentArg?.userId !== previousArg?.userId || currentArg?.cursor !== previousArg?.cursor
        )
      },
      merge: (cache, res) => {
        if (cache.totalCount !== res.totalCount) {
          return res
        }

        if (cache) {
          cache.items.push(...res.items)
          cache.cursor = res.cursor
          cache.hasMore = res.hasMore
        } else {
          return res
        }
      },
      providesTags: (_, error) => (error ? [] : ['posts']),
      query: ({ userId, ...rest }) => ({ params: rest, url: `/public-posts/user/${userId}` }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
    }),
  }),
})

export const { getAllPublicPosts, getUsersPosts } = publicPostsApi.endpoints
export const { useGetAllPublicPostsQuery, useGetUsersPostsQuery } = publicPostsApi

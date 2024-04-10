import { PostItem } from '@/entities/post'
import { baseApi } from '@/shared/api/base-api'

import {
  GetAllPostsArgs,
  GetPostsArgs,
  GetPostsResponse,
  GetPublicPostsResponse,
} from '../model/types/api.types'

export const publicPostsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAllPublicPosts: builder.query<GetPostsResponse, GetPostsArgs>({
      query: ({ pageSize = 4, sortDirection = 'desc', ...rest }) => ({
        params: { pageSize, sortDirection, ...rest },
        url: `/public-posts/all`,
      }),
    }),
    getPublicPost: builder.query<
      PostItem,
      { postId: number; userId: string | string[] | undefined }
    >({
      query: data => ({
        params: { userId: data.userId },
        url: `/public-posts/${data.postId}`,
      }),
    }),
    getUsersPosts: builder.query<GetPublicPostsResponse, GetAllPostsArgs>({
      forceRefetch({ currentArg, previousArg }) {
        return (
          currentArg?.userId !== previousArg?.userId || currentArg?.cursor !== previousArg?.cursor
        )
      },
      merge: (cache, res) => {
        if (cache.userId !== res.userId) {
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
      query: ({ userId, ...rest }) => ({ params: rest, url: `/public-posts/user/${userId}` }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return `${endpointName}(${queryArgs.userId})`
      },
    }),
  }),
})

export const { getAllPublicPosts, getPublicPost, getUsersPosts } = publicPostsApi.endpoints
export const { useGetAllPublicPostsQuery, useGetPublicPostQuery, useGetUsersPostsQuery } =
  publicPostsApi

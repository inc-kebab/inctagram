import { baseApi } from '@/shared/api/base-api'

import { AddImagesResponse, GetPostsResponse, PostsParams } from '../model/types/posts.types'

const postsAPI = baseApi.injectEndpoints({
  endpoints: builder => ({
    addImages: builder.mutation<AddImagesResponse, FormData[]>({
      query: body => ({
        body,
        method: 'POST',
        url: '/posts/images',
      }),
    }),
    getMyPosts: builder.query<GetPostsResponse, PostsParams>({
      query: () => ({ url: '/posts' }),
    }),
  }),
})

export const { useAddImagesMutation, useGetMyPostsQuery } = postsAPI

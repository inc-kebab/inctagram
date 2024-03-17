import { baseApi } from '@/shared/api/base-api'

import {
  AddImagesResponse,
  CratePostParams,
  CreatePostResponse,
  GetPostsResponse,
  PostsParams,
} from '../model/types/posts.types'

const postsAPI = baseApi.injectEndpoints({
  endpoints: builder => ({
    addImages: builder.mutation<AddImagesResponse, any>({
      query: body => ({
        body,
        method: 'POST',
        url: '/posts/images',
      }),
    }),
    createPost: builder.mutation<CreatePostResponse, CratePostParams>({
      query: body => ({
        body,
        method: 'POST',
        url: '/posts',
      }),
    }),
    getMyPosts: builder.query<GetPostsResponse, PostsParams>({
      query: () => ({ url: '/posts' }),
    }),
  }),
})

export const { useAddImagesMutation, useGetMyPostsQuery } = postsAPI

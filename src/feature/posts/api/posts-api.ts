import { baseApi } from '@/shared/api/base-api'

import {
  AddImagesResponse,
  CreatePostParams,
  CreatePostResponse,
  GetPostsResponse,
  PostsParams,
} from '../model/types/posts.types'

const postsAPI = baseApi.injectEndpoints({
  endpoints: builder => ({
    addImages: builder.mutation<AddImagesResponse, FormData>({
      query: body => ({
        body,
        method: 'POST',
        url: '/posts/images',
      }),
    }),
    createPost: builder.mutation<CreatePostResponse, CreatePostParams>({
      query: body => ({
        body,
        method: 'POST',
        url: '/posts',
      }),
    }),
    deleteImage: builder.mutation<void, string>({
      query: imageId => ({ method: 'DELETE', url: `/posts/images/${imageId}` }),
    }),
    getMyPosts: builder.query<GetPostsResponse, PostsParams>({
      query: () => ({ url: '/posts' }),
    }),
  }),
})

export const { useAddImagesMutation, useDeleteImageMutation, useGetMyPostsQuery } = postsAPI

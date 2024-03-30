import { EditPostArgs } from '@/feature/post/model/types/post.types'
import { baseApi } from '@/shared/api/base-api'

import {
  AddImagesResponse,
  CreatePostParams,
  CreatePostResponse,
  GetPostsResponse,
  PostsParams,
} from '../model/types/post.types'

const postsApi = baseApi.injectEndpoints({
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
    editPost: builder.mutation<void, EditPostArgs>({
      query: body => ({
        body: body.description,
        method: 'PUT',
        url: `/posts/${body.id}`,
      }),
    }),
    getMyPosts: builder.query<GetPostsResponse, PostsParams>({
      query: () => ({ url: '/posts' }),
    }),
  }),
})

export const {
  useAddImagesMutation,
  useCreatePostMutation,
  useDeleteImageMutation,
  useEditPostMutation,
  useGetMyPostsQuery,
} = postsApi

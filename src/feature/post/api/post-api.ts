import { baseApi } from '@/shared/api/base-api'
import { handleErrorResponse } from '@/shared/helpers/handleErrorResponse'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

import {
  AddImagesResponse,
  CreatePostArgs,
  CreatePostResponse,
  DeletePostArgs,
  EditPostArgs,
  GetPostsArgs,
  GetPostsResponse,
} from '../model/types/api.types'

const postApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    addImages: builder.mutation<AddImagesResponse, FormData>({
      query: body => ({
        body,
        method: 'POST',
        url: '/posts/images',
      }),
    }),
    createPost: builder.mutation<CreatePostResponse, CreatePostArgs>({
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        let patchResult

        try {
          const { data: post } = await queryFulfilled

          patchResult = dispatch(
            postApi.util.updateQueryData('getMyPosts', {}, draft => {
              if (draft) {
                draft.items.unshift(post)
              }
            })
          )
        } catch (e) {
          patchResult?.undo
          handleErrorResponse(e as FetchBaseQueryError)
        }
      },
      query: body => ({
        body,
        method: 'POST',
        url: '/posts',
      }),
    }),
    deleteImage: builder.mutation<void, string>({
      query: imageId => ({ method: 'DELETE', url: `/posts/images/${imageId}` }),
    }),
    deletePost: builder.mutation<void, DeletePostArgs>({
      onQueryStarted: async ({ id }, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          postApi.util.updateQueryData('getMyPosts', {}, draft => {
            if (draft) {
              const deletedPostIdx = draft.items.findIndex(el => el.id === id)

              if (deletedPostIdx !== -1) {
                draft.items.splice(deletedPostIdx, 1)
              }
            }
          })
        )

        try {
          await queryFulfilled
        } catch (e) {
          patchResult.undo
        }
      },
      query: ({ id }) => ({
        method: 'DELETE',
        url: `/posts/${id}`,
      }),
    }),
    editPost: builder.mutation<void, EditPostArgs>({
      onQueryStarted: async ({ description, id }, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          postApi.util.updateQueryData('getMyPosts', {}, draft => {
            if (draft) {
              const editedPostIdx = draft.items.findIndex(el => el.id === id)

              if (editedPostIdx !== -1) {
                draft.items[editedPostIdx].description = description
              }
            }
          })
        )

        try {
          await queryFulfilled
        } catch (e) {
          patchResult.undo
        }
      },
      query: body => ({
        body,
        method: 'PUT',
        url: `/posts/${body.id}`,
      }),
    }),
    getMyPosts: builder.query<GetPostsResponse, GetPostsArgs>({
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
      merge: (cache, res) => {
        if (cache) {
          cache.items.push(...res.items)
          cache.cursor = res.cursor
          cache.hasMore = res.hasMore
        } else {
          return res
        }
      },
      providesTags: (_, error) => (error ? [] : ['myPosts']),
      query: params => ({ params, url: '/posts' }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
    }),
  }),
})

export const {
  useAddImagesMutation,
  useCreatePostMutation,
  useDeleteImageMutation,
  useDeletePostMutation,
  useEditPostMutation,
  useGetMyPostsQuery,
} = postApi

export const { invalidateTags: invalidateTagsPost } = postApi.util
export const { getMyPosts } = postApi.endpoints

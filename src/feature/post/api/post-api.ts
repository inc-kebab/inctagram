import { baseApi } from '@/shared/api/base-api'

import {
  DeletePostArgs,
  EditPostArgs,
  GetMyPostsArgs,
  GetMyPostsResponse,
} from '../model/types/api.types'

const postApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    deletePost: builder.mutation<void, DeletePostArgs>({
      onQueryStarted: async ({ id }, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          postApi.util.updateQueryData('getMyPosts', {}, draft => {
            const deletedPostIdx = draft.items.findIndex(el => el.id === id)

            if (deletedPostIdx !== -1) {
              draft.items.splice(deletedPostIdx, 1)
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
            const editedPostIdx = draft.items.findIndex(el => el.id === id)

            if (editedPostIdx !== -1) {
              draft.items[editedPostIdx].description = description
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
    getMyPosts: builder.query<GetMyPostsResponse, GetMyPostsArgs>({
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

export const { useDeletePostMutation, useEditPostMutation, useGetMyPostsQuery } = postApi
export const { invalidateTags: invalidateTagsPost } = postApi.util

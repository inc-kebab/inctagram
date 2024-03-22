import { baseApi } from '@/shared/api/base-api'

import { DeleteArgs, EditPostArgs, GetMyPostsResponse } from '../model/types/api.types'

const postApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    deletePost: builder.mutation<void, DeleteArgs>({
      onQueryStarted: async ({ id }, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          postApi.util.updateQueryData('getMyPosts', undefined, draft => {
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
      invalidatesTags: ['myPosts'],
      onQueryStarted: async ({ description, id }, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          postApi.util.updateQueryData('getMyPosts', undefined, draft => {
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
    getMyPosts: builder.query<GetMyPostsResponse, void>({
      providesTags: (_, error) => (error ? [] : ['myPosts']),
      query: () => ({ url: '/posts' }),
    }),
  }),
})

export const { useDeletePostMutation, useEditPostMutation, useGetMyPostsQuery } = postApi

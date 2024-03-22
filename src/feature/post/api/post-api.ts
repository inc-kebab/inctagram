import { baseApi } from '@/shared/api/base-api'

import { DeleteArgs, EditPostArgs } from '../model/types/api.types'

const postApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    deletePost: builder.mutation<void, DeleteArgs>({
      // async onQueryStarted(id, { dispatch, queryFulfilled }) {
      //   const patchResult = dispatch(
      //     profileApi.util.updateQueryData('getPosts', id, draft => {
      //       if (draft) {
      //         console.log(JSON.stringify(draft))
      //       }
      //     })
      //   )
      //
      //   try {
      //     await queryFulfilled
      //   } catch (e) {
      //     patchResult.undo
      //   }
      // },
      query: id => ({
        method: 'DELETE',
        url: `/posts/${id}`,
      }),
    }),
    editPost: builder.mutation<void, EditPostArgs>({
      query: body => ({
        body: body.description,
        method: 'PUT',
        url: `/posts/${body.id}`,
      }),
    }),
  }),
})

export const { useDeletePostMutation, useEditPostMutation } = postApi

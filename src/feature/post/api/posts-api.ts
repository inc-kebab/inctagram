import { DeleteArgs } from '@/feature/post/model/types/api.types'
import { baseApi } from '@/shared/api/base-api'

const profileApi = baseApi.injectEndpoints({
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
  }),
})

export const { useDeletePostMutation } = profileApi

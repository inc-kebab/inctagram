import { EditPostArgs } from '@/feature/post/model/types/post.types'
import { baseApi } from '@/shared/api/base-api'

const postApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    editPost: builder.mutation<void, EditPostArgs>({
      query: body => ({
        body: body.description,
        method: 'PUT',
        url: `/posts/${body.id}`,
      }),
    }),
  }),
})

export const { useEditPostMutation } = postApi

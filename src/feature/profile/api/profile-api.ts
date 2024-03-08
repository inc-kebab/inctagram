import { baseApi } from '@/shared/api/base-api'

const profileApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    removeAvatar: builder.mutation<void, void>({
      query: () => ({
        method: 'DELETE',
        url: '/profile/avatar',
      }),
    }),
  }),
})

export const { useRemoveAvatarMutation } = profileApi

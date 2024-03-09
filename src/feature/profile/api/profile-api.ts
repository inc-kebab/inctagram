import { AddAvatarResponse } from '@/feature/profile/model/types/profile.types'
import { baseApi } from '@/shared/api/base-api'

const profileApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    addAvatar: builder.mutation<AddAvatarResponse, FormData>({
      query: body => ({
        body,
        method: 'POST',
        url: '/profile/avatar',
      }),
    }),
    removeAvatar: builder.mutation<void, void>({
      query: () => ({
        method: 'DELETE',
        url: '/profile/avatar',
      }),
    }),
  }),
})

export const { useAddAvatarMutation, useRemoveAvatarMutation } = profileApi

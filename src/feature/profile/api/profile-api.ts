import { AddAvatarResponse } from '@/feature/profile/model/types/profile.types'
import { baseApi } from '@/shared/api/base-api'

const profileApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    addAvatar: builder.mutation<void, AddAvatarResponse>({
      query: body => ({
        body,
        method: 'POST',
        url: '/profile/avatar',
      }),
    }),
  }),
})

export const { useAddAvatarMutation } = profileApi

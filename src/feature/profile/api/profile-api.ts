import { baseApi } from '@/shared/api/base-api'

import { GetProfileResponse } from '../model/types/profile.types'
import { EditProfileFormValues } from '../model/utils/validators/editProfileSchema'

const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getMyProfile: builder.query<GetProfileResponse, void>({
      query: () => ({ url: '/profile' }),
    }),
    updateProfile: builder.mutation<void, EditProfileFormValues>({
      query: body => ({
        body,
        method: 'PUT',
        url: '/profile',
      }),
    }),
  }),
})

export const { useGetMyProfileQuery, useUpdateProfileMutation } = authApi

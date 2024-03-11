import { baseApi } from '@/shared/api/base-api'

import { GetProfileResponse, UpdateProfileArgs } from '../model/types/profile.types'

const profileAPI = baseApi.injectEndpoints({
  endpoints: builder => ({
    getMyProfile: builder.query<GetProfileResponse, void>({
      query: () => ({ url: '/profile' }),
    }),
    updateProfile: builder.mutation<void, UpdateProfileArgs>({
      invalidatesTags: ['profile'],
      onQueryStarted: async (
        { aboutMe, birthDate, city, firstname, lastname, username },
        { dispatch, queryFulfilled }
      ) => {
        const result = dispatch(
          profileAPI.util.updateQueryData('getMyProfile', undefined, draft => {
            if (draft) {
              draft.aboutMe = aboutMe as string
              draft.dateOfBirth = birthDate
              draft.city = city as string
              draft.firstName = firstname
              draft.lastName = lastname
              draft.username = username
            }
          })
        )

        try {
          await queryFulfilled
        } catch {
          result.undo()
        }
      },
      query: body => ({
        body,
        method: 'PUT',
        url: '/profile',
      }),
    }),
  }),
})

export const { useGetMyProfileQuery, useUpdateProfileMutation } = profileAPI

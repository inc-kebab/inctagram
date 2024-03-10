import { RootState } from '@/app/store/store'
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
        { dispatch, getState, queryFulfilled }
      ) => {
        const {
          profile: { profile },
        } = getState() as RootState

        const result = dispatch(
          profileAPI.util.updateQueryData('getMyProfile', undefined, draft => {
            Object.assign(draft, { profile })
          })
        )
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

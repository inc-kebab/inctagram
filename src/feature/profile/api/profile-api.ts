import { baseApi } from '@/shared/api/base-api'

import {
  AddAvatarResponse,
  GetProfileResponse,
  UpdateProfileArgs,
} from '../model/types/profile.types'

const profileAPI = baseApi.injectEndpoints({
  endpoints: builder => ({
    changeProfilePhoto: builder.mutation<AddAvatarResponse, FormData>({
      invalidatesTags: (_, error) => (error ? [] : ['profile']),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        let avatar
        let patchResult

        try {
          await queryFulfilled

          patchResult = dispatch(
            profileAPI.util.updateQueryData('getMyProfile', undefined, draft => {
              const avatarFile = args.get('file')

              if (avatarFile instanceof File) {
                avatar = URL.createObjectURL(avatarFile)
                draft.avatars = {
                  'avatar-medium': {
                    fileSize: avatarFile.size,
                    height: 300,
                    url: URL.createObjectURL(avatarFile),
                    width: 300,
                  },
                  'avatar-thumbnail': {
                    fileSize: avatarFile.size,
                    height: 300,
                    url: URL.createObjectURL(avatarFile),
                    width: 300,
                  },
                }
              }
            })
          )
        } catch (err) {
          patchResult && patchResult.undo()
        } finally {
          avatar && URL.revokeObjectURL(avatar)
        }
      },
      query: body => ({
        body,
        method: 'POST',
        url: '/profile/avatar',
      }),
    }),
    getMyProfile: builder.query<GetProfileResponse, void>({
      providesTags: ['profile'],
      query: () => ({ url: '/profile' }),
    }),
    removeProfilePhoto: builder.mutation<void, void>({
      // invalidatesTags: ['profile'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          profileAPI.util.updateQueryData('getMyProfile', undefined, draft => {
            if (draft) {
              draft.avatars = null
            }
          })
        )

        try {
          await queryFulfilled
        } catch (err) {
          patchResult.undo()
        }
      },
      query: () => ({
        method: 'DELETE',
        url: '/profile/avatar',
      }),
    }),
    updateProfile: builder.mutation<void, UpdateProfileArgs>({
      // invalidatesTags: ['profile'],
      onQueryStarted: async (
        { aboutMe, birthDate, city, firstname, lastname, username },
        { dispatch, queryFulfilled }
      ) => {
        const result = dispatch(
          profileAPI.util.updateQueryData('getMyProfile', undefined, draft => {
            if (draft) {
              draft.aboutMe = aboutMe || null
              draft.birthDate = birthDate
              draft.city = city || null
              draft.firstname = firstname
              draft.lastname = lastname
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

export const {
  useChangeProfilePhotoMutation,
  useGetMyProfileQuery,
  useRemoveProfilePhotoMutation,
  useUpdateProfileMutation,
} = profileAPI

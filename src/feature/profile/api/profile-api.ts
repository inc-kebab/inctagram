import { baseApi } from '@/shared/api/base-api'

import { GetProfileResponse, UpdateProfileArgs } from '../model/types/profile.types'

const profileAPI = baseApi.injectEndpoints({
  endpoints: builder => ({
    addAvatar: builder.mutation<AddAvatarResponse, FormData>({
      async onQueryStarted(
        args,
        { dispatch, queryFulfilled }: { dispatch: any; queryFulfilled: Promise<any> }
      ) {
        let avatar
        const patchResult = dispatch(
          profileAPI.util.updateQueryData('getAvatar', undefined, (draft: any) => {
            const avatarFile = args.get('file')

            if (draft && avatarFile instanceof File) {
              avatar = URL.createObjectURL(avatarFile)
              draft.avatars = {
                avatar: {
                  url: URL.createObjectURL(avatarFile),
                },
              }
            }
          })
        )

        try {
          await queryFulfilled
        } catch (err) {
          patchResult.undo()
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
    getAvatar: builder.query<void, void>({
      query: () => ({
        method: 'GET',
        url: '/profile',
      }),
    }),
    getMyProfile: builder.query<GetProfileResponse, void>({
      query: () => ({ url: '/profile' }),
    }),
    removeAvatar: builder.mutation<void, void>({
      async onQueryStarted(
        _,
        { dispatch, queryFulfilled }: { dispatch: any; queryFulfilled: any }
      ) {
        const patchResult = dispatch(
          profileAPI.util.updateQueryData('getAvatar', _, (draft: any) => {
            if (draft) {
              draft.avatars = {
                avatar: {
                  url: null,
                },
              }
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

export const {
  useAddAvatarMutation,
  useGetAvatarQuery,
  useGetMyProfileQuery,
  useRemoveAvatarMutation,
  useUpdateProfileMutation,
} = profileAPI

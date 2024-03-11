import { AddAvatarResponse } from '@/feature/profile/model/types/profile.types'
import { baseApi } from '@/shared/api/base-api'

const profileApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    addAvatar: builder.mutation<AddAvatarResponse, FormData>({
      async onQueryStarted(
        args,
        { dispatch, queryFulfilled }: { dispatch: any; queryFulfilled: Promise<any> }
      ) {
        let avatar
        const patchResult = dispatch(
          profileApi.util.updateQueryData('getAvatar', undefined, (draft: any) => {
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
    removeAvatar: builder.mutation<void, void>({
      async onQueryStarted(
        _,
        { dispatch, queryFulfilled }: { dispatch: any; queryFulfilled: any }
      ) {
        const patchResult = dispatch(
          profileApi.util.updateQueryData('getAvatar', _, (draft: any) => {
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
  }),
  // overrideExisting: true,
})

export const { useAddAvatarMutation, useGetAvatarQuery, useRemoveAvatarMutation } = profileApi

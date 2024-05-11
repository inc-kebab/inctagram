import { DeactivateDeviceArgs, Device } from '@/feature/devices'
import { baseApi } from '@/shared/api'

const devicesAPI = baseApi.injectEndpoints({
  endpoints: builder => ({
    deactivateDevice: builder.mutation<void, DeactivateDeviceArgs>({
      invalidatesTags: ['devices'],
      // onQueryStarted: async ({ deviceId }, { dispatch, queryFulfilled }) => {
      //   const patchResult = dispatch(
      //     devicesAPI.util.updateQueryData('getDevices', undefined, draft => {
      //       if (draft) {
      //         const deleteDevice = draft.findIndex(el => el.deviceId === deviceId)
      //
      //         if (deleteDevice !== -1) {
      //           draft.splice(deleteDevice, 1)
      //         }
      //       }
      //     })
      //   )
      //
      //   try {
      //     await queryFulfilled
      //   } catch (e) {
      //     patchResult.undo
      //   }
      // },
      query: ({ deviceId }) => ({ method: 'DELETE', url: `/devices/${deviceId}` }),
    }),
    getDevices: builder.query<Device[], void>({
      providesTags: (_, error) => (error ? [] : ['devices']),
      query: () => ({ method: 'GET', url: '/devices' }),
    }),
  }),
})

export const { useDeactivateDeviceMutation, useGetDevicesQuery } = devicesAPI

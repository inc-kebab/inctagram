import { baseApi } from '@/shared/api'

import { DeactivateDeviceArgs, GetDevicesResponse } from '../model/types/api.types'

const devicesAPI = baseApi.injectEndpoints({
  endpoints: builder => ({
    deactivateAllOtherDevices: builder.mutation<void, void>({
      invalidatesTags: (_, error) => (error ? [] : ['devices']),
      query: () => ({ method: 'DELETE', url: `/devices` }),
    }),
    deactivateDevice: builder.mutation<void, DeactivateDeviceArgs>({
      invalidatesTags: (_, error) => (error ? [] : ['devices']),
      query: ({ deviceId }) => ({ method: 'DELETE', url: `/devices/${deviceId}` }),
    }),
    getDevices: builder.query<GetDevicesResponse, void>({
      providesTags: ['devices'],
      query: () => ({ method: 'GET', url: '/devices' }),
    }),
  }),
})

export const {
  useDeactivateAllOtherDevicesMutation,
  useDeactivateDeviceMutation,
  useGetDevicesQuery,
} = devicesAPI

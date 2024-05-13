import { Device } from '@/entities/device'

export type GetDevicesResponse = {
  current: Device
  others: Device[]
}

export type DeactivateDeviceArgs = { deviceId: string }

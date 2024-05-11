export type Device = {
  deviceId: string
  ip: string
  lastActiveDate: string
  title: string
}

export type GetDevicesResponse = {
  current: Device
  others: Device[]
}

export type DeactivateDeviceArgs = { deviceId: string }

import { CurrentDevice, OtherDevice } from '@/entities/device'
import {
  useDeactivateAllOtherDevicesMutation,
  useDeactivateDeviceMutation,
  useGetDevicesQuery,
} from '@/feature/devices'
import { getDeviceInfo, handleErrorResponse } from '@/shared/helpers'
import { useTranslation } from '@/shared/hooks'
import { Button } from '@/shared/ui/Button'
import { Loader } from '@/shared/ui/Loader'
import { Typography } from '@/shared/ui/Typography'

import s from './Devices.module.scss'

export const Devices = () => {
  const { t } = useTranslation()

  const { data, isFetching, isLoading } = useGetDevicesQuery()

  const [deactivate, { isLoading: isDeactivateLoad }] = useDeactivateDeviceMutation()
  const [deactivateOther, { isLoading: isDeactivateOtherLoad }] =
    useDeactivateAllOtherDevicesMutation()

  const currentDeviceInfo = data?.current
    ? { data: data.current, ...getDeviceInfo(data.current.title) }
    : null

  const handleDeactivateOtherDevices = () => {
    deactivateOther().then(res => {
      if ('error' in res) {
        handleErrorResponse(res.error)
      }
    })
  }

  const disabled = isDeactivateLoad || isDeactivateOtherLoad || isFetching

  if (isLoading) {
    return <Loader className={s.loader} containerHeight />
  }

  return (
    <section className={s.container}>
      {currentDeviceInfo && <CurrentDevice deviceData={currentDeviceInfo} />}
      <Button
        className={s.terminate}
        disabled={data?.others.length === 0 || disabled}
        onClick={handleDeactivateOtherDevices}
        variant="outline"
      >
        {t.pages.profileSettings.terminate}
      </Button>
      {data?.others.length ? (
        data.others.map((device, i) => {
          const handleDeactivateCurrentDevice = () => {
            deactivate({ deviceId: device.deviceId }).then(res => {
              if ('error' in res) {
                handleErrorResponse(res.error)
              }
            })
          }

          return (
            <OtherDevice
              device={device}
              disabled={disabled}
              isFirst={i === 0}
              key={device.deviceId + device.title}
              onDeactivate={handleDeactivateCurrentDevice}
            />
          )
        })
      ) : (
        <Typography className={s.emptyList} textAlign="center">
          {t.pages.profileSettings.emptyDevicesList}
        </Typography>
      )}
    </section>
  )
}

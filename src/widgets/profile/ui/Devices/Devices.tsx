import { ReactElement, useMemo } from 'react'

import {
  Device,
  useDeactivateAllOtherDevicesMutation,
  useDeactivateDeviceMutation,
  useGetDevicesQuery,
} from '@/feature/devices'
import { ContentWrapper } from '@/feature/payment'
import ServerError from '@/pages/500'
import { Logout } from '@/shared/assets/icons/common'
import { PC, Phone, Tablet } from '@/shared/assets/icons/other'
import { getDeviceInfo, handleErrorResponse } from '@/shared/helpers'
import { useTranslation } from '@/shared/hooks'
import { Button } from '@/shared/ui/Button'
import { Loader } from '@/shared/ui/Loader'
import { Typography } from '@/shared/ui/Typography'
import clsx from 'clsx'
import { format } from 'date-fns'

import s from './Devices.module.scss'

const hashDevicesIcons: Record<string, ReactElement> = {
  mobile: <Phone className={s.icon} />,
  pc: <PC className={s.icon} />,
  tablet: <Tablet className={s.icon} />,
}

export const Devices = () => {
  const { t } = useTranslation()

  const { data, isError, isLoading } = useGetDevicesQuery()

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

  if (isLoading) {
    return <Loader className={s.loader} containerHeight />
  }

  if (isError) {
    return <ServerError />
  }

  return (
    <section className={s.container}>
      {currentDeviceInfo && (
        <ContentWrapper classNameCard={s.card} title={t.pages.profileSettings.currentDevice}>
          {hashDevicesIcons[currentDeviceInfo.type] || <PC className={s.icon} />}
          <div>
            <Typography className={s.title} variant="regularBold16">
              {currentDeviceInfo.name}
            </Typography>
            <Typography variant="regular14">{currentDeviceInfo.data.ip}</Typography>
            <Typography className={clsx(s.lastVisit, s.online)} variant="small">
              {t.pages.profileSettings.online}
            </Typography>
          </div>
        </ContentWrapper>
      )}
      <Button
        className={s.terminate}
        disabled={data?.others.length === 0}
        onClick={handleDeactivateOtherDevices}
        variant="outline"
      >
        {t.pages.profileSettings.terminate}
      </Button>
      <Typography asComponent="h3" className={s.title} variant="h3">
        {t.pages.profileSettings.activeSessions}
      </Typography>
      {data?.others.length ? (
        data.others.map(device => {
          const handleDeactivateCurrentDevice = () => {
            deactivate({ deviceId: device.deviceId }).then(res => {
              if ('error' in res) {
                handleErrorResponse(res.error)
              }
            })
          }

          const { name, type } = getDeviceInfo(device.title)

          const deviceIcon = hashDevicesIcons[type] || <PC className={s.icon} />

          return (
            <ContentWrapper
              className={s.activeSessions}
              classNameCard={s.card}
              key={device.deviceId + device.title}
            >
              <div className={s.session}>
                {deviceIcon}
                <div>
                  <Typography className={s.title} variant="regularBold16">
                    {name}
                  </Typography>
                  <Typography variant="regular14">IP: {device.ip}</Typography>
                  <Typography className={s.lastVisit} variant="small">
                    {t.pages.profileSettings.lastVisit}:{' '}
                    {format(device.lastActiveDate, 'dd.MM.yyyy - kk:mm:ss')}
                  </Typography>
                </div>
              </div>
              <Button
                className={s.logOut}
                disabled={isDeactivateLoad || isDeactivateOtherLoad}
                onClick={handleDeactivateCurrentDevice}
                startIcon={<Logout />}
                variant="text"
              >
                {t.button.logOut}
              </Button>
            </ContentWrapper>
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

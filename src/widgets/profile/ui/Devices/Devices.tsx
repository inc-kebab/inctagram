import { useDeactivateDeviceMutation, useGetDevicesQuery } from '@/feature/devices'
import { ContentWrapper } from '@/feature/payment'
import ServerError from '@/pages/500'
import { Logout } from '@/shared/assets/icons/common'
import { Chrome, Phone } from '@/shared/assets/icons/other'
import { getBrowser } from '@/shared/helpers'
import { useTranslation } from '@/shared/hooks'
import { Button } from '@/shared/ui/Button'
import { Loader } from '@/shared/ui/Loader'
import { Typography } from '@/shared/ui/Typography'
import { format } from 'date-fns'

import s from './Devices.module.scss'

export const Devices = () => {
  const { t } = useTranslation()
  const { data: devices, isError, isLoading } = useGetDevicesQuery()
  const [deactivateDevice, { isLoading: isDeactivate }] = useDeactivateDeviceMutation()

  console.log(devices)

  if (isLoading) {
    return <Loader className={s.loader} containerHeight />
  }

  if (isError) {
    return <ServerError />
  }

  return (
    <section className={s.container}>
      <ContentWrapper classNameCard={s.card} title={t.pages.profileSettings.currentDevice}>
        <Chrome className={s.icon} />
        <div>
          <Typography className={s.title} variant="regularBold16">
            Chrome
          </Typography>
          <Typography variant="regular14">IP: 22.345.345.12</Typography>
        </div>
      </ContentWrapper>
      <Button className={s.terminate} variant="outline">
        {t.pages.profileSettings.terminate}
      </Button>
      <Typography asComponent="h3" className={s.title} variant="h3">
        {t.pages.profileSettings.activeSessions}
      </Typography>
      {devices ? (
        devices.map(device => {
          return (
            <ContentWrapper
              className={s.activeSessions}
              classNameCard={s.card}
              key={device.deviceId + device.title}
            >
              <Phone className={s.icon} />
              <div>
                <Typography className={s.title} variant="regularBold16">
                  {getBrowser(device.title)}
                </Typography>
                <Typography variant="regular14">IP: {device.ip}</Typography>
                <Typography className={s.lastVisit} variant="small">
                  {t.pages.profileSettings.lastVisit}: {format(device.lastActiveDate, 'dd.MM.yyyy')}
                </Typography>
              </div>
              <Button
                className={s.logOut}
                disabled={isDeactivate}
                onClick={() => deactivateDevice({ deviceId: device.deviceId })}
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

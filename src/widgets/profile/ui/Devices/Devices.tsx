import { ContentWrapper } from '@/feature/payment'
import { Logout } from '@/shared/assets/icons/common'
import { Chrome, Phone, Tablet } from '@/shared/assets/icons/other'
import { useTranslation } from '@/shared/hooks'
import { Button } from '@/shared/ui/Button'
import { Typography } from '@/shared/ui/Typography'

import s from './Devices.module.scss'

const temp = [
  {
    deviceId: '0bb6902e-673d-4ab1-ab94-eb41134008e0',
    ip: '::ffff:10.244.0.189',
    lastActiveDate: '2024-05-10T13:05:44.473Z',
    title:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  },
  {
    deviceId: 'e0f21cd7-b3c2-4946-9eee-a19842390058',
    ip: ':10.244.0.189',
    lastActiveDate: '2024-05-10T13:24:39.117Z',
    title: 'PostmanRuntime/7.37.3',
  },
]

export const Devices = () => {
  const { t } = useTranslation()

  return (
    <section className={s.container}>
      <ContentWrapper className={{ card: s.card }} title={t.pages.profileSettings.currentDevice}>
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

      {temp.map((device, i) => {
        const date = new Date(device.lastActiveDate)
        const formattedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`

        return (
          <ContentWrapper
            className={{ card: s.card, container: s.activeSessions }}
            key={device.deviceId + device.title}
            title={i === 0 ? t.pages.profileSettings.activeSessions : ''}
          >
            <Phone className={s.icon} />
            <div>
              <Typography className={s.title} variant="regularBold16">
                Chrome
              </Typography>
              <Typography variant="regular14">{device.ip}</Typography>
              <Typography className={s.lastVisit} variant="small">
                {t.pages.profileSettings.lastVisit}: {formattedDate}
              </Typography>
            </div>
            <Button className={s.logOut} startIcon={<Logout />} variant="text">
              {t.button.logOut}
            </Button>
          </ContentWrapper>
        )
      })}
    </section>
  )
}

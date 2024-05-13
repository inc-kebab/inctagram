import { useMemo } from 'react'

import { ContentWrapper } from '@/feature/payment'
import { Logout } from '@/shared/assets/icons/common'
import { PC } from '@/shared/assets/icons/other'
import { getDeviceInfo } from '@/shared/helpers'
import { extractIPAddress } from '@/shared/helpers/extractIPAddress'
import { useTranslation } from '@/shared/hooks'
import { Button } from '@/shared/ui/Button'
import { Typography } from '@/shared/ui/Typography'
import { format } from 'date-fns'

import s from './Device.module.scss'

import { Device } from '../../model/types/device.type'
import { getDevicesIcons } from '../../model/utils/getDevicesIcons'

interface Props {
  device: Device
  disabled?: boolean
  isFirst?: boolean
  onDeactivate: () => void
}

export const OtherDevice = ({ device, disabled, isFirst, onDeactivate }: Props) => {
  const { t } = useTranslation()

  const { name, type } = getDeviceInfo(device.title)

  const hashDevicesIcons = useMemo(() => getDevicesIcons(s.icon), [])

  const deviceIcon = hashDevicesIcons[type] || <PC className={s.icon} />

  return (
    <ContentWrapper
      className={s.activeSessions}
      classNameCard={s.card}
      title={isFirst ? t.pages.profileSettings.activeSessions : undefined}
    >
      <div className={s.session}>
        {deviceIcon}
        <div>
          <Typography className={s.title} variant="regularBold16">
            {name}
          </Typography>
          <Typography variant="regular14">IP: {extractIPAddress(device.ip)}</Typography>
          <Typography className={s.lastVisit} variant="small">
            {t.pages.profileSettings.lastVisit}:{' '}
            {format(device.lastActiveDate, 'dd.MM.yyyy - kk:mm:ss')}
          </Typography>
        </div>
      </div>
      <Button
        className={s.logOut}
        disabled={disabled}
        onClick={onDeactivate}
        startIcon={<Logout />}
        variant="text"
      >
        {t.button.logOut}
      </Button>
    </ContentWrapper>
  )
}

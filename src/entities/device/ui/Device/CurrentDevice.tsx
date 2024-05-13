import { useMemo } from 'react'

import { ContentWrapper } from '@/feature/payment'
import { PC } from '@/shared/assets/icons/other'
import { extractIPAddress } from '@/shared/helpers/extractIPAddress'
import { useTranslation } from '@/shared/hooks'
import { Typography } from '@/shared/ui/Typography'
import clsx from 'clsx'

import s from './Device.module.scss'

import { Device } from '../../model/types/device.type'
import { getDevicesIcons } from '../../model/utils/getDevicesIcons'

interface Props {
  deviceData: { data: Device; name: string; type: string }
}

export const CurrentDevice = ({ deviceData }: Props) => {
  const { t } = useTranslation()

  const hashDevicesIcons = useMemo(() => getDevicesIcons(s.icon), [])

  return (
    <ContentWrapper classNameCard={s.card} title={t.pages.profileSettings.currentDevice}>
      {hashDevicesIcons[deviceData.type] || <PC className={s.icon} />}
      <div>
        <Typography className={s.title} variant="regularBold16">
          {deviceData.name}
        </Typography>
        <Typography variant="regular14">IP: {extractIPAddress(deviceData.data.ip)}</Typography>
        <Typography className={clsx(s.lastVisit, s.online)} variant="small">
          {t.pages.profileSettings.online}
        </Typography>
      </div>
    </ContentWrapper>
  )
}

import { ReactElement } from 'react'

import { PC, Phone, Tablet } from '@/shared/assets/icons/other'

export const getDevicesIcons = (classNameIcon: string): Record<string, ReactElement> => {
  return {
    mobile: <Phone className={classNameIcon} />,
    pc: <PC className={classNameIcon} />,
    tablet: <Tablet className={classNameIcon} />,
  }
}

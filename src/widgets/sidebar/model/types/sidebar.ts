import { ReactNode } from 'react'

import { UrlObject } from 'url'

export interface SidebarElement {
  activeIcon?: ReactNode
  href: UrlObject | string
  icon?: ReactNode
  showForOnlyPremium?: boolean
  title?: string
}

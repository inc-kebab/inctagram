import { ComponentType, ReactElement, ReactNode } from 'react'

import { NextPage } from 'next'

export type Page<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
  layout?: ComponentType
}

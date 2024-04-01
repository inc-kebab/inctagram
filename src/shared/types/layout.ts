import { ReactElement, ReactNode } from 'react'

import { LocaleType } from '@/../locales'
import { NextPage } from 'next'

export type Page<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement, t: LocaleType) => ReactNode
}

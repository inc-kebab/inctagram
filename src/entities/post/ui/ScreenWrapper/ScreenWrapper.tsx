import { PropsWithChildren } from 'react'

import s from './ScreenWrapper.module.scss'

export const ScreenWrapper = ({ children }: PropsWithChildren) => {
  return <div className={s.container}>{children}</div>
}

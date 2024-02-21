import { PropsWithChildren } from 'react'

import { Header } from '@/widgets/header'

import s from './PublicLayout.module.scss'

export const PublicLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header isUnauthorized />
      <main className={s.main}>{children}</main>
    </>
  )
}

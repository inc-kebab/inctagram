import { PropsWithChildren } from 'react'

import { Header } from '@/widgets/header'

import s from './AuthLayout.module.scss'

export const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <main className={s.main}>{children}</main>
    </>
  )
}

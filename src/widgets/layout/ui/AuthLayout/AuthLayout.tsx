import { PropsWithChildren } from 'react'

import { Meta, MetaProps } from '@/shared/seo/Meta'

import s from './AuthLayout.module.scss'

import { Header } from '../Header/Header'

type Props = PropsWithChildren & Omit<MetaProps, 'children'>

export const AuthLayout = ({ children, ...rest }: Props) => {
  return (
    <Meta {...rest}>
      <Header />
      <main className={s.main}>{children}</main>
    </Meta>
  )
}

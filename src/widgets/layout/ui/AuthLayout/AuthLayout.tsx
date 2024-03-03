import { PropsWithChildren } from 'react'

import { Meta, MetaProps } from '@/shared/seo/Meta'
import { Header } from '@/widgets/header'

import s from './AuthLayout.module.scss'

type Props = PropsWithChildren & Omit<MetaProps, 'children'>

export const AuthLayout = ({ children, ...rest }: Props) => {
  return (
    <Meta {...rest}>
      <Header />
      <main className={s.main}>{children}</main>
    </Meta>
  )
}

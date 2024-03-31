import { PropsWithChildren } from 'react'

import { Meta, MetaProps } from '@/shared/seo/Meta'

import s from './PublicLayout.module.scss'

import { Header } from '../Header/Header'

type Props = PropsWithChildren & Omit<MetaProps, 'children'>

export const PublicLayout = ({ children, ...rest }: Props) => {
  return (
    <Meta {...rest}>
      <Header isUnauthorized />
      <main className={s.main}>{children}</main>
    </Meta>
  )
}

import { PropsWithChildren } from 'react'

import { Meta, MetaProps } from '@/shared/seo/Meta'
import { Header } from '@/widgets/header'

import s from './PublicLayout.module.scss'

type Props = PropsWithChildren & Omit<MetaProps, 'children'>

export const PublicLayout = ({ children, ...rest }: Props) => {
  return (
    <Meta {...rest}>
      <Header isUnauthorized />
      <main className={s.main}>{children}</main>
    </Meta>
  )
}

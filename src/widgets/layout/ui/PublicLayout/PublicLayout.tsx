import { PropsWithChildren } from 'react'

import { useTranslation } from '@/shared/hooks'
import { Meta, MetaProps } from '@/shared/seo/Meta'
import { BackToPage } from '@/shared/ui/BackToPage'
import { useRouter } from 'next/router'

import s from './PublicLayout.module.scss'

import { Header } from '../Header/Header'

type Props = {
  isAuth?: boolean
} & PropsWithChildren &
  Omit<MetaProps, 'children'>

export const PublicLayout = ({ children, isAuth, ...rest }: Props) => {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <Meta {...rest}>
      <Header isUnauthorized={!isAuth} />
      <main className={s.main}>
        {isAuth && <BackToPage className={s.back} onNavigate={router.back} title={t.button.back} />}
        {children}
      </main>
    </Meta>
  )
}

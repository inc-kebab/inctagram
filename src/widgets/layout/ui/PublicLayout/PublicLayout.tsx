import { PropsWithChildren } from 'react'

import { MeResponse } from '@/feature/auth/model/types/api.types'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Meta, MetaProps } from '@/shared/seo/Meta'
import { BackToPage } from '@/shared/ui/BackToPage'
import { useRouter } from 'next/router'

import s from './PublicLayout.module.scss'

import { Header } from '../Header/Header'

type Props = { currentUser?: MeResponse } & PropsWithChildren & Omit<MetaProps, 'children'>

export const PublicLayout = ({ children, ...rest }: Props) => {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <Meta {...rest}>
      <Header isUnauthorized={!rest.currentUser} />
      <main className={s.main}>
        {rest.currentUser && <BackToPage onNavigate={router.back} title={t.button.back} />}
        {children}
      </main>
    </Meta>
  )
}

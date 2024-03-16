import { useEffect, useState } from 'react'

import { useMeQuery } from '@/feature/auth'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Page } from '@/shared/types/layout'
import { Loader } from '@/shared/ui/Loader'
import { PublicLayout } from '@/widgets/layout'
import { useRouter } from 'next/router'

const Public: Page = () => {
  const [loading, setLoading] = useState(true)

  const { push } = useRouter()

  const { data } = useMeQuery()

  const { t } = useTranslation()

  useEffect(() => {
    if (data) {
      void push('/home')
    } else {
      setLoading(false)
    }
  }, [data, push])

  if (loading) {
    return <Loader fullHeight />
  }

  return (
    <PublicLayout title={t.pages.main.metaTitle}>
      <main>POSTS LIST</main>
    </PublicLayout>
  )
}

export default Public

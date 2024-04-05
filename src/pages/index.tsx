import { DefenderAuthRoute } from '@/shared/helpers/hoc/DefenderAuthRoute'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Page } from '@/shared/types/layout'
import { PublicLayout } from '@/widgets/layout'

const Public: Page = () => {
  const { t } = useTranslation()

  return (
    <PublicLayout title={t.pages.main.metaTitle}>
      <main>POSTS LIST</main>
    </PublicLayout>
  )
}

Public.getLayout = (page, t) => {
  return <PublicLayout title={t.pages.main.metaTitle}>{page}</PublicLayout>
}

export default DefenderAuthRoute(Public)

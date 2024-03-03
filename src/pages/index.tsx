import { Page } from '@/shared/types/layout'
import { PublicLayout } from '@/widgets/layout'

const Public: Page = () => {
  return (
    <>
      <main>POSTS LIST</main>
    </>
  )
}

Public.getLayout = (page, t) => {
  return <PublicLayout title={t.pages.main.metaTitle}>{page}</PublicLayout>
}

export default Public

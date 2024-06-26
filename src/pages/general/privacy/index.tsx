import { memo } from 'react'

import { DefenderPublicRoute } from '@/shared/helpers'
import { useTranslation } from '@/shared/hooks'
import { Page } from '@/shared/types/layout'
import { BackToPage } from '@/shared/ui/BackToPage'
import { Typography } from '@/shared/ui/Typography'
import { AuthLayout } from '@/widgets/layout'
import { useRouter } from 'next/router'

import s from './Privacy.module.scss'

const Privacy: Page = memo(() => {
  const { t } = useTranslation()

  const router = useRouter()

  const handleNavigateToPrevPage = () => router.back()

  const shouldShowBackBtn = router.query.sender !== 'profile'

  return (
    <div className={s.wrapper}>
      {shouldShowBackBtn && (
        <BackToPage
          className={s.link}
          onNavigate={handleNavigateToPrevPage}
          title={router.query.sender === 'signup' ? t.button.backToSignUp : t.button.back}
        />
      )}
      <Typography asComponent="h1" className={s.title} textAlign="center" variant="h1">
        {t.pages.privacy.title}
      </Typography>
      <Typography asComponent="h2" className={s.subTitle} variant="h2">
        {t.pages.privacy.mattersTitle}
      </Typography>
      <Typography className={s.text} variant="regular14">
        {t.pages.privacy.matters}
      </Typography>
      <Typography asComponent="h2" className={s.subTitle} variant="h2">
        {t.pages.privacy.collectionDataTitle}
      </Typography>
      <Typography className={s.text} variant="regular14">
        {t.pages.privacy.collectionData1}
      </Typography>
      <Typography className={s.text} variant="regular14">
        {t.pages.privacy.collectionData2}
      </Typography>
      <Typography asComponent="h2" className={s.subTitle} variant="h2">
        {t.pages.privacy.disclosureDataTitle}
      </Typography>
      <Typography className={s.text} variant="regular14">
        {t.pages.privacy.disclosureData}
      </Typography>
      <Typography asComponent="h2" className={s.subTitle} variant="h2">
        {t.pages.privacy.protectionDataTitle}
      </Typography>
      <Typography className={s.text} variant="regular14">
        {t.pages.privacy.protectionData}
      </Typography>
      <Typography asComponent="h2" className={s.subTitle} variant="h2">
        {t.pages.privacy.linksTitle}
      </Typography>
      <Typography className={s.text} variant="regular14">
        {t.pages.privacy.links}
      </Typography>
      <Typography asComponent="h2" className={s.subTitle} variant="h2">
        {t.pages.privacy.changesTitle}
      </Typography>
      <Typography className={s.text} variant="regular14">
        {t.pages.privacy.changes}
      </Typography>
    </div>
  )
})

Privacy.getLayout = (page, t) => {
  return (
    <AuthLayout description={t.pages.privacy.metaDescription} title={t.pages.privacy.metaTitle}>
      {page}
    </AuthLayout>
  )
}

export default DefenderPublicRoute(Privacy)

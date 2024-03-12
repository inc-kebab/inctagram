import { memo } from 'react'

import { useTranslation } from '@/shared/hooks/useTranslation'
import { Page } from '@/shared/types/layout'
import { BackToPage } from '@/shared/ui/BackToPage'
import { Typography } from '@/shared/ui/Typography'
import { AuthLayout } from '@/widgets/layout'
import { useRouter } from 'next/router'

import s from './Terms.module.scss'

const Terms: Page = memo(() => {
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
        {t.pages.terms.title}
      </Typography>
      <Typography className={s.text} variant="regular14">
        {t.pages.terms.welcome}
      </Typography>
      <Typography asComponent="h2" className={s.subTitle} variant="h2">
        {t.pages.terms.registration}
      </Typography>
      <Typography className={s.text} variant="regular14">
        {t.pages.terms.registration1}
      </Typography>
      <Typography className={s.text} variant="regular14">
        {t.pages.terms.registration2}
      </Typography>
      <Typography className={s.text} variant="regular14">
        {t.pages.terms.registration3}
      </Typography>
      <Typography asComponent="h2" className={s.subTitle} variant="h2">
        {t.pages.terms.rules}
      </Typography>
      <Typography className={s.text} variant="regular14">
        {t.pages.terms.rules1}
      </Typography>
      <Typography className={s.text} variant="regular14">
        {t.pages.terms.rules2}
      </Typography>
      <Typography className={s.text} variant="regular14">
        {t.pages.terms.rules3}
      </Typography>
      <Typography className={s.text} variant="regular14">
        {t.pages.terms.rules4}
      </Typography>
      <Typography className={s.text} variant="regular14">
        {t.pages.terms.rules5}
      </Typography>
      <Typography asComponent="h2" className={s.subTitle} variant="h2">
        {t.pages.terms.intellect}
      </Typography>
      <Typography className={s.text} variant="regular14">
        {t.pages.terms.intellect1}
      </Typography>
      <Typography className={s.text} variant="regular14">
        {t.pages.terms.intellect2}
      </Typography>
      <Typography asComponent="h2" className={s.subTitle} variant="h2">
        {t.pages.terms.liability}
      </Typography>
      <Typography className={s.text} variant="regular14">
        {t.pages.terms.liability1}
      </Typography>
      <Typography className={s.text} variant="regular14">
        {t.pages.terms.liability2}
      </Typography>
      <Typography className={s.text} variant="regular14">
        {t.pages.terms.liability3}
      </Typography>
      <Typography asComponent="h2" className={s.subTitle} variant="h2">
        {t.pages.terms.changes}
      </Typography>
      <Typography className={s.text} variant="regular14">
        {t.pages.terms.changes1}
      </Typography>
      <Typography className={s.text} variant="regular14">
        {t.pages.terms.changes2}
      </Typography>
    </div>
  )
})

Terms.getLayout = (page, t) => {
  return (
    <AuthLayout description={t.pages.terms.metaDescription} title={t.pages.terms.metaTitle}>
      {page}
    </AuthLayout>
  )
}

export default Terms

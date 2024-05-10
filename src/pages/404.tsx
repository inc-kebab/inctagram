import { Error404 } from '@/shared/assets/images'
import { useTranslation } from '@/shared/hooks'
import { Typography } from '@/shared/ui/Typography'
import Link from 'next/link'

import s from './index.module.scss'

const NotFound = () => {
  const { t } = useTranslation()

  return (
    <div className={s.errorPage}>
      <Typography asComponent="h1" textAlign="center" variant="h1">
        {t.pages.notFound.notFound}
      </Typography>
      <Typography textAlign="center">{t.pages.notFound.description}</Typography>
      <Error404 className={s.errorImage} />
      <span>
        {t.pages.notFound.backTo}
        <Link className={s.link} href="/">
          {t.pages.notFound.mainPage}
        </Link>
      </span>
    </div>
  )
}

export default NotFound

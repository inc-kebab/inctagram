import { ServerError as ServerErrorImg } from '@/shared/assets/images'
import { useTranslation } from '@/shared/hooks'
import { Typography } from '@/shared/ui/Typography'
import Link from 'next/link'

import s from './index.module.scss'

const ServerError = () => {
  const { t } = useTranslation()

  return (
    <div className={s.errorPage}>
      <Typography asComponent="h1" textAlign="center" variant="h1">
        {t.pages.serverError.internalServerError}
      </Typography>
      <Typography className={s.description} textAlign="center">
        {t.pages.serverError.description}
        <Link className={s.link} href="/">
          {t.pages.serverError.startPage}
        </Link>
      </Typography>
      <ServerErrorImg className={s.errorImage} />
    </div>
  )
}

export default ServerError

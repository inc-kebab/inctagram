import { AppRoutes, AuthRoutes } from '@/shared/const/routes'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Button } from '@/shared/ui/Button'
import { Typography } from '@/shared/ui/Typography'
import { LangSwitcher, MobileLangSwitcher } from '@/widgets/lang-switcher'
import Link from 'next/link'

import s from './Header.module.scss'

interface Props {
  isUnauthorized?: boolean
}

export const Header = ({ isUnauthorized }: Props) => {
  const { t } = useTranslation()

  return (
    <header className={s.header}>
      <div className={s.content}>
        <Typography
          asComponent={Link}
          className={s.logo}
          color="primary"
          href={AppRoutes.MAIN}
          variant="large"
        >
          Inctagram
        </Typography>
        <div className={s.actions}>
          <LangSwitcher className={s.lang} />
          <MobileLangSwitcher className={s.langMobile} />
          {isUnauthorized && (
            <>
              <Button
                asComponent={Link}
                className={s.login}
                href={AuthRoutes.SIGN_IN}
                variant="text"
              >
                {t.button.signIn}
              </Button>
              <Button
                asComponent={Link}
                className={s.register}
                href={AuthRoutes.SIGN_UP}
                variant="primary"
              >
                {t.button.signUp}
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

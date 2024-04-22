import { AppRoutes, AuthRoutes } from '@/shared/const/routes'
import { useTranslation } from '@/shared/hooks'
import { Button } from '@/shared/ui/Button'
import { Typography } from '@/shared/ui/Typography'
import { LangSwitcher } from '@/widgets/lang-switcher'
import clsx from 'clsx'
import Link from 'next/link'

import s from './Header.module.scss'

import { MobileMenu } from './MobileMenu/MobileMenu'

interface Props {
  disabled?: boolean
  isAuth?: boolean
  onLogout?: () => void
  ownerId?: number
}

export const Header = ({ disabled, isAuth, onLogout, ownerId }: Props) => {
  const { t } = useTranslation()

  return (
    <header className={s.header}>
      <div className={clsx('main_container', s.content)}>
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
          <LangSwitcher />
          {!isAuth && (
            <div className={s.auth}>
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
            </div>
          )}
          <MobileMenu disabled={disabled} isAuth={isAuth} onLogout={onLogout} ownerId={ownerId} />
        </div>
      </div>
    </header>
  )
}

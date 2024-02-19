import { AppRoutes, AuthRoutes } from '@/shared/const/routes'
import { Button } from '@/shared/ui/Button'
import { Typography } from '@/shared/ui/Typography'
import { LangSwitcherSelect } from '@/widgets/lang-switcher'
import Link from 'next/link'

import s from './Header.module.scss'

interface Props {
  isUnauthorized?: boolean
}

export const Header = ({ isUnauthorized }: Props) => {
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
          <LangSwitcherSelect />
          {isUnauthorized && (
            <>
              <Button
                asComponent={Link}
                className={s.login}
                href={AuthRoutes.SIGN_IN}
                variant="text"
              >
                Sign In
              </Button>
              <Button
                asComponent={Link}
                className={s.register}
                href={AuthRoutes.SIGN_UP}
                variant="primary"
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

import { More } from '@/shared/assets/icons/common'
import { AppRoutes, AuthRoutes } from '@/shared/const/routes'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Button } from '@/shared/ui/Button'
import { Dropdown } from '@/shared/ui/DropDownMenu'
import { Typography } from '@/shared/ui/Typography'
import { LangSwitcher } from '@/widgets/lang-switcher'
import clsx from 'clsx'
import Link from 'next/link'

import s from './Header.module.scss'

interface Props {
  isUnauthorized?: boolean
}

export const Header = ({ isUnauthorized }: Props) => {
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
          {isUnauthorized && (
            <>
              <div className={s.pc}>
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

              <Dropdown.Menu
                trigger={<Button className={s.mobile} startIcon={<More />} variant="text" />}
              >
                <>
                  <Button
                    asComponent={Link}
                    className={s.mobileLogin}
                    href={AuthRoutes.SIGN_IN}
                    variant="text"
                  >
                    {t.button.signIn}
                  </Button>
                  <Button
                    asComponent={Link}
                    className={s.mobileRegister}
                    href={AuthRoutes.SIGN_UP}
                    variant="primary"
                  >
                    {t.button.signUp}
                  </Button>
                </>
              </Dropdown.Menu>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

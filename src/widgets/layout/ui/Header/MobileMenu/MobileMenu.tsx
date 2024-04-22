import { LogoutDialog } from '@/feature/auth'
import { More, Trending } from '@/shared/assets/icons/common'
import { Bookmark, Settings } from '@/shared/assets/icons/outline'
import { AppRoutes, AuthRoutes } from '@/shared/const/routes'
import { useTranslation } from '@/shared/hooks'
import { Button } from '@/shared/ui/Button'
import { Dropdown } from '@/shared/ui/DropDownMenu'
import { Typography } from '@/shared/ui/Typography'
import Link from 'next/link'

import s from './MobileMenu.module.scss'

interface Props {
  disabled?: boolean
  isAuth?: boolean
  onLogout?: () => void
  ownerId?: number
}

export const MobileMenu = ({ disabled, isAuth, onLogout, ownerId }: Props) => {
  const { t } = useTranslation()

  const authItems = (
    <>
      {ownerId && (
        <Dropdown.Item className={s.item}>
          <Typography
            asComponent={Link}
            className={s.option}
            href={{
              pathname: AppRoutes.PROFILE + `/${ownerId}/settings`,
              query: { tab: 'general' },
            }}
            variant="regular14"
          >
            <Settings />
            {t.button.profileSettings}
          </Typography>
        </Dropdown.Item>
      )}
      <Dropdown.Item className={s.item}>
        <Typography
          asComponent={Link}
          className={s.option}
          href={AppRoutes.STATISTICS}
          variant="regular14"
        >
          <Trending />
          {t.button.statistics}
        </Typography>
      </Dropdown.Item>
      <Dropdown.Item className={s.item}>
        <Typography
          asComponent={Link}
          className={s.option}
          href={AppRoutes.FAVORITES}
          variant="regular14"
        >
          <Bookmark />
          {t.button.favorites}
        </Typography>
      </Dropdown.Item>
      <LogoutDialog classNameTrigger={s.logout} disabled={disabled} onLogout={onLogout} />
    </>
  )

  const noAuthItems = (
    <>
      <Dropdown.Item className={s.item}>
        <Typography
          asComponent={Link}
          className={s.link}
          href={AuthRoutes.SIGN_IN}
          variant="regular14"
        >
          {t.button.signIn}
        </Typography>
      </Dropdown.Item>
      <Dropdown.Item className={s.item}>
        <Typography
          asComponent={Link}
          className={s.link}
          href={AuthRoutes.SIGN_UP}
          variant="regular14"
        >
          {t.button.signUp}
        </Typography>
      </Dropdown.Item>
    </>
  )

  return (
    <Dropdown.Menu
      align="end"
      className={s.menu}
      modal={false}
      sideOffset={6}
      trigger={<Button className={s.root} startIcon={<More />} variant="text" />}
    >
      {isAuth ? authItems : noAuthItems}
    </Dropdown.Menu>
  )
}

import { AppRoutes } from '@/shared/const/routes'
import { useTranslation } from '@/shared/hooks'
import { Avatar } from '@/shared/ui/Avatar'
import { Button } from '@/shared/ui/Button'
import { Typography } from '@/shared/ui/Typography'
import clsx from 'clsx'
import Link from 'next/link'

import s from './ProfileInfo.module.scss'

import { Profile } from '../../model/types/profile.types'

interface Props {
  className?: string
  myProfile?: boolean
  ownerId?: number
  userData: Profile
}

export const ProfileInfo = ({ className, myProfile = true, ownerId, userData }: Props) => {
  const { t } = useTranslation()

  const username = userData.username || ''

  return (
    <div className={clsx(s.ProfileInfo, className)}>
      <Avatar avatarUrl={userData?.avatar} circle className={s.avatar} wrapperSize={200} />
      <Typography asComponent="h2" className={s.name} title={userData?.username} variant="h1">
        {username.length > 15 ? username.slice(0, 15) + '...' : username}
      </Typography>
      {myProfile && ownerId && (
        <Button
          asComponent={Link}
          className={s.settings}
          href={{ pathname: AppRoutes.PROFILE + `/${ownerId}/settings`, query: { tab: 'general' } }}
          variant="secondary"
        >
          {t.button.profileSettings}
        </Button>
      )}
      <ul className={s.subscriber}>
        <li className={s.item}>
          <span className={s.count}>2 218</span> {t.pages.profile.following}
        </li>
        <li className={s.item}>
          <span className={s.count}>2 358</span> {t.pages.profile.followers}
        </li>
        <li className={s.item}>
          <span className={s.count}>2 764</span> {t.pages.profile.publications}
        </li>
      </ul>
      {userData?.aboutMe && (
        <Typography className={s.aboutMe} variant="regular16">
          {userData.aboutMe}
        </Typography>
      )}
    </div>
  )
}

import { AppRoutes } from '@/shared/const/routes'
import { Avatar } from '@/shared/ui/Avatar'
import { Button } from '@/shared/ui/Button'
import { Typography } from '@/shared/ui/Typography'
import clsx from 'clsx'
import Link from 'next/link'

import s from './ProfileInfo.module.scss'

import { Profile } from '../../model/types/profile.types'

interface Props {
  className?: string
  userData?: Profile
}

export const ProfileInfo = ({ className, userData }: Props) => {
  return (
    <div className={clsx(s.ProfileInfo, className)}>
      <Avatar avatarUrl={userData?.avatar} circle wrapperSize={200} />
      <div className={s.info}>
        <div className={s.header}>
          <Typography asComponent="h2" className={s.name} variant="h1">
            {userData?.username}
          </Typography>
          <Button
            asComponent={Link}
            href={{ pathname: AppRoutes.PROFILE_SETTINGS, query: { tab: 'general' } }}
            variant="secondary"
          >
            Profile settings
          </Button>
        </div>
        <ul className={s.subscriber}>
          <li className={s.item}>
            <span className={s.count}>2 218</span> Following
          </li>
          <li className={s.item}>
            <span className={s.count}>2 358</span> Followers
          </li>
          <li className={s.item}>
            <span className={s.count}>2 764</span> Publications
          </li>
        </ul>
        {userData?.aboutMe && <Typography variant="regular16">{userData.aboutMe}</Typography>}
      </div>
    </div>
  )
}

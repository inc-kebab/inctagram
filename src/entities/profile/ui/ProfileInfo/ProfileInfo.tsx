import ImageIcon from '@/shared/assets/icons/fill/image.svg'
import { AppRoutes } from '@/shared/const/routes'
import { Button } from '@/shared/ui/Button'
import { Typography } from '@/shared/ui/Typography'
import clsx from 'clsx'
import Image from 'next/image'
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
      {userData?.avatar ? (
        <Image
          alt="profile avatar"
          className={s.avatar}
          height={200}
          priority
          src={userData?.avatar}
          width={200}
        />
      ) : (
        <div className={s.iconWrapper}>
          <ImageIcon className={s.image} />
        </div>
      )}
      <div className={s.info}>
        <div className={s.name}>
          <Typography asComponent="h2" variant="h1">
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
        <div>subscribers</div>
        <div>about me</div>
      </div>
    </div>
  )
}

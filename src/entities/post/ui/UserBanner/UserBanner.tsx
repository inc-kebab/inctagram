import { ReactNode } from 'react'

import { Avatar } from '@/shared/ui/Avatar'
import { Typography } from '@/shared/ui/Typography'
import clsx from 'clsx'

import s from './UserBanner.module.scss'

type Props = {
  actions?: ReactNode
  avatar?: string
  avatarSize?: number
  className?: string
  name: string
}

export const UserBanner = ({ actions, avatar, avatarSize = 36, className, name }: Props) => {
  return (
    <div className={clsx(s.userBanner, className)}>
      <div className={s.userInfo}>
        <Avatar
          avatarUrl={avatar}
          circle
          iconSize={(avatarSize / 100) * 60}
          wrapperSize={avatarSize}
        />
        <Typography>{name}</Typography>
      </div>
      {actions}
    </div>
  )
}

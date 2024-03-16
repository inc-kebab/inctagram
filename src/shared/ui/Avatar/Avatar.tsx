import clsx from 'clsx'
import Image from 'next/image'

import s from './Avatar.module.scss'

import ImageIcon from '../../assets/icons/fill/image.svg'

type Props = {
  avatarUrl?: string
  circle?: boolean
  className?: string
  iconSize?: number
  wrapperSize?: number
}

export const Avatar = ({
  avatarUrl,
  circle,
  className,
  iconSize = 48,
  wrapperSize = 300,
}: Props) => {
  return avatarUrl ? (
    <Image
      alt="avatar"
      height={wrapperSize}
      priority
      src={avatarUrl}
      style={{
        borderRadius: circle ? '50%' : '',
      }}
      width={wrapperSize}
    />
  ) : (
    <div
      className={clsx(s.iconWrapper, className)}
      style={{
        borderRadius: circle ? '50%' : '',
        height: `${wrapperSize}px`,
        width: `${wrapperSize}px`,
      }}
    >
      <ImageIcon
        style={{
          height: `${iconSize}px`,
          width: `${iconSize}px`,
        }}
      />
    </div>
  )
}

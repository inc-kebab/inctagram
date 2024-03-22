import { ComponentPropsWithoutRef } from 'react'

import clsx from 'clsx'
import Image from 'next/image'

import s from './PostPreviewCard.module.scss'

type Props = {
  description: null | string
  imageSrc: string
} & ComponentPropsWithoutRef<'div'>

export const PostPreviewCard = ({ className, description, imageSrc, ...rest }: Props) => {
  return (
    <div className={clsx(s.image, className)} {...rest}>
      <Image
        alt={description || 'post'}
        fill
        priority
        sizes="(max-width: 576px) 100vw, (max-width: 1200px) 50vw, 30vw"
        src={imageSrc}
        style={{ objectFit: 'cover' }} //? or contain
      />
    </div>
  )
}

import { useEffect, useRef, useState } from 'react'

import { UserBanner } from '@/entities/user'
import { getDefaultSwiperConfig } from '@/shared/helpers'
import { useTranslation } from '@/shared/hooks'
import { Typography } from '@/shared/ui/Typography'
import clsx from 'clsx'
import { formatDistanceToNowStrict, parseISO } from 'date-fns'
import { enUS, ru } from 'date-fns/locale'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Swiper, SwiperSlide } from 'swiper/react'

import s from './PublicPost.module.scss'

import { PostItem } from '../../model/types/post.types'

type Props = {
  onNavigateToPost: () => void
  post: PostItem
}

export const PublicPost = ({ onNavigateToPost, post }: Props) => {
  const { t } = useTranslation()

  const { locale } = useRouter()

  const descriptionRef = useRef<Nullable<HTMLDivElement>>(null)

  const [isExpanded, setIsExpanded] = useState(false)
  const [isTruncated, setIsTruncated] = useState(false)

  const toggleIsExpanded = () => setIsExpanded(prev => !prev)

  const timeAgo = formatDistanceToNowStrict(parseISO(post.createdAt as string), {
    addSuffix: true,
    locale: locale === 'ru' ? ru : enUS,
  })

  useEffect(() => {
    if (descriptionRef.current) {
      if (descriptionRef.current.clientHeight < descriptionRef.current.scrollHeight) {
        setIsTruncated(true)
      }
    }
  }, [descriptionRef])

  if (!post) {
    return null
  }

  return (
    <div className={s.post}>
      <Swiper {...getDefaultSwiperConfig({ classes: [s.slider, { [s.sliderMin]: isExpanded }] })}>
        {post.images.map((image, i) => {
          return (
            <SwiperSlide key={image.url + i}>
              <Image
                alt={'Post image ' + i}
                height={240}
                onClick={onNavigateToPost}
                src={image.url}
                style={{ objectFit: 'cover' }}
                width={234}
              />
            </SwiperSlide>
          )
        })}
      </Swiper>
      <UserBanner avatar={post.avatarOwner} className={s.banner} name={post.username} />
      <Typography className={s.timeAgo} variant="small">
        {timeAgo}
      </Typography>
      {post.description && (
        <>
          <div className={clsx(s.description, isExpanded && s.descriptionMax)} ref={descriptionRef}>
            {post.description}
          </div>
          {isTruncated && (
            <span className={s.toggleText} onClick={toggleIsExpanded}>
              {isExpanded ? t.button.showLess : t.button.showMore}
            </span>
          )}
        </>
      )}
    </div>
  )
}

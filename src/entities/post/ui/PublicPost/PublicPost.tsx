import { useCallback, useEffect, useMemo, useState } from 'react'

import { getPostSliderConfig } from '@/feature/post/model/config/getPostSliderConfig'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { formatDistanceToNowStrict, parseISO } from 'date-fns'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'

import s from './PublicPost.module.scss'

import { PostItem } from '../../model/types/post.types'

type Props = { handleClick: () => void; post: PostItem | undefined }

export const PublicPost = ({ handleClick, post }: Props) => {
  const { t } = useTranslation()
  const [isExpanded, setIsExpanded] = useState(false)
  const [isTruncated, setIsTruncated] = useState(false)
  const toggleIsExpanded = useCallback(() => setIsExpanded(prev => !prev), [])

  const timeAgo = useMemo(
    () => formatDistanceToNowStrict(parseISO(post?.createdAt as string), { addSuffix: true }),
    [post?.createdAt]
  )

  useEffect(() => {
    if (post?.description && post.description.length > 83) {
      setIsTruncated(true)
      setIsExpanded(false)
    } else {
      setIsTruncated(false)
    }
  }, [post?.description])

  if (!post) {
    return null
  }

  return (
    <div className={s.post}>
      <div className={s.imageContainer}>
        {post.images.length > 1 ? (
          <Swiper {...getPostSliderConfig({ classes: [s.slider] })}>
            {post?.images?.map((image, i) => {
              return (
                <SwiperSlide key={image.url + i}>
                  <Image alt={image.url + i} fill onClick={() => handleClick()} src={image.url} />
                </SwiperSlide>
              )
            })}
          </Swiper>
        ) : (
          <Image
            alt="post image"
            height={240}
            onClick={() => handleClick()}
            src={post.images[0].url}
            width={234}
          />
        )}
      </div>
      <div className={s.user}>
        <Image
          alt="userAvatar"
          className={s.avatar}
          height={36}
          src={post.avatarOwner || ''}
          width={36}
        />

        <span className={s.userName}>{post.username}</span>
      </div>
      <div className={s.timeAgo}>{timeAgo}</div>
      <div className={`${s.description} ${isExpanded ? s.expanded : ''}`}>
        <span className={s.textContent}>
          {isTruncated && !isExpanded
            ? `${post?.description?.substring(0, 83)}...`
            : post.description}
        </span>{' '}
        {isTruncated && (
          <span className={s.toggleText} onClick={toggleIsExpanded}>
            {isExpanded ? t.button.showLess : t.button.showMore}
          </span>
        )}
      </div>
    </div>
  )
}

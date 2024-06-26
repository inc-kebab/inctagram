import { useRef, useState } from 'react'

import { PostItem } from '@/entities/post'
import { useInfinityScroll } from '@/shared/hooks'
import { NextRouter } from 'next/router'

interface Params {
  cursor?: number
  hasMore?: boolean
  router: NextRouter
  setCurrentCursor: (cursor?: number) => void
}

export const useProfile = ({ cursor, hasMore, router, setCurrentCursor }: Params) => {
  const { query, replace } = router

  const triggerRef = useRef<HTMLDivElement | null>(null)

  const [currentPost, setCurrentPost] = useState<Nullable<PostItem>>(null)

  const [openPostDetails, setOpenPostDetails] = useState(false)

  const handleChangeCurrentPost = (post: PostItem) => {
    setCurrentPost(post)
    setOpenPostDetails(true)
    void replace({ query: { id: query.id, post: post.id } }, undefined, { shallow: true })
  }

  useInfinityScroll({
    callback: () => setCurrentCursor(cursor),
    hasMore: hasMore,
    triggerRef,
  })

  return {
    currentPost,
    handleChangeCurrentPost,
    openPostDetails,
    setCurrentPost,
    setOpenPostDetails,
    triggerRef,
  }
}

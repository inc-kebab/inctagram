import { useRef, useState } from 'react'

import { PostItem } from '@/entities/post'
import { useInfinityScroll } from '@/shared/hooks/useInfinityScroll'
import { NextRouter } from 'next/router'

interface Params {
  cursor?: number
  hasMore?: boolean
  router: NextRouter
  setCurrentCursor: (cursor?: number) => void
}

export const useProfile = ({ cursor, hasMore, router, setCurrentCursor }: Params) => {
  const { push, query } = router

  const triggerRef = useRef<HTMLDivElement | null>(null)

  const [currentPost, setCurrentPost] = useState<Nullable<PostItem>>(null)

  const [openPostDetailsModal, setOpenPostDetailsModal] = useState(false)

  const handleChangeCurrentPost = (post: PostItem) => {
    setCurrentPost(post)
    setOpenPostDetailsModal(true)
    void push({ query: { id: query.id, post: post.id } }, undefined, { shallow: true })
  }

  useInfinityScroll({
    callback: () => setCurrentCursor(cursor),
    hasMore: hasMore,
    triggerRef,
  })

  return {
    currentPost,
    handleChangeCurrentPost,
    openPostDetailsModal,
    setCurrentPost,
    setOpenPostDetailsModal,
    triggerRef,
  }
}

import { useEffect, useState } from 'react'

import { PostsList, PostsListSkeleton } from '@/entities/post'
import { ProfileInfo } from '@/entities/profile'
import { PostDetailsDialogs, useGetPublicPostQuery, useGetUsersPostsQuery } from '@/feature/post'
import { useGetPublicProfileQuery } from '@/feature/profile'
import { PublicLayout, SidebarLayout } from '@/widgets/layout'
import { useRouter } from 'next/router'

import { useProfile } from '../../model/hooks/useProfile'

interface Props {
  isPublicPage?: boolean
}

export const SomeProfileContent = ({ isPublicPage }: Props) => {
  const router = useRouter()

  const { query } = router

  const [currentCursor, setCurrentCursor] = useState<number | undefined>(undefined)

  const { data } = useGetPublicProfileQuery(Number(query.id))
  const { data: posts, isFetching } = useGetUsersPostsQuery({
    cursor: currentCursor,
    userId: Number(query.id),
  })
  const { data: publicPost } = useGetPublicPostQuery(
    { postId: Number(query.post), userId: query.id },
    { skip: !query.post }
  )

  const {
    currentPost,
    handleChangeCurrentPost,
    openPostDetailsModal,
    setCurrentPost,
    setOpenPostDetailsModal,
    triggerRef,
  } = useProfile({ cursor: posts?.cursor, hasMore: posts?.hasMore, router, setCurrentCursor })

  useEffect(() => {
    if (query.post && publicPost) {
      handleChangeCurrentPost(publicPost)
    }
  }, [])

  const content = (
    <>
      <ProfileInfo
        myProfile={false}
        userData={{
          aboutMe: data?.aboutMe,
          avatar: data?.avatars?.['avatar-medium']?.url,
          username: data?.username,
        }}
      />
      <PostsList
        cursor={posts?.cursor}
        list={posts?.items}
        onSetCurrentPost={handleChangeCurrentPost}
        ref={triggerRef}
      />
      {isFetching && <PostsListSkeleton />}
      <PostDetailsDialogs
        currentPost={currentPost}
        isOwner={false}
        openPostDetailsModal={openPostDetailsModal}
        setCurrentPost={setCurrentPost}
        setOpenPostDetailsModal={setOpenPostDetailsModal}
      />
    </>
  )

  return isPublicPage ? (
    <PublicLayout>{content}</PublicLayout>
  ) : (
    <SidebarLayout>{content}</SidebarLayout>
  )
}

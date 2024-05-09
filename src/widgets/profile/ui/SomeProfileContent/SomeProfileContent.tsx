import { useEffect, useState } from 'react'

import { PostsList, PostsListSkeleton } from '@/entities/post'
import { ProfileInfo } from '@/entities/profile'
import { useMeQuery } from '@/feature/auth'
import { useGetPublicPostQuery, useGetUsersPostsQuery } from '@/feature/post'
import { useGetPublicProfileQuery } from '@/feature/profile'
import { PublicLayout, SidebarLayout } from '@/widgets/layout'
import { PostDetailsDialogs } from '@/widgets/post'
import { useRouter } from 'next/router'

import { useProfile } from '../../model/hooks/useProfile'

interface Props {
  isPublicPage?: boolean
}

export const SomeProfileContent = ({ isPublicPage }: Props) => {
  const router = useRouter()

  const { query } = router

  const [currentCursor, setCurrentCursor] = useState<number | undefined>(undefined)

  const { data: me, isError } = useMeQuery(undefined)
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
    openPostDetails,
    setCurrentPost,
    setOpenPostDetails,
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
        isFetching={isFetching}
        list={posts?.items}
        onSetCurrentPost={handleChangeCurrentPost}
        ref={triggerRef}
      />
      {isFetching && <PostsListSkeleton />}
      <PostDetailsDialogs
        currentPost={currentPost}
        isAuth={!isError}
        isOwner={false}
        onOpenChange={setOpenPostDetails}
        open={openPostDetails}
        setCurrentPost={setCurrentPost}
      />
    </>
  )

  return isPublicPage ? (
    <PublicLayout>{content}</PublicLayout>
  ) : (
    <SidebarLayout>{content}</SidebarLayout>
  )
}

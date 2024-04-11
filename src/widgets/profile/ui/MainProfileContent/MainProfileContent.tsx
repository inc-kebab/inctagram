import { useEffect, useState } from 'react'

import { PostsList, PostsListSkeleton } from '@/entities/post'
import { ProfileInfo } from '@/entities/profile'
import { useMeQuery } from '@/feature/auth'
import { PostDetailsDialogs, useGetMyPostsQuery, useGetPublicPostQuery } from '@/feature/post'
import { useGetMyProfileQuery } from '@/feature/profile'
import { SidebarLayout } from '@/widgets/layout'
import { useRouter } from 'next/router'

import { useProfile } from '../../model/hooks/useProfile'

export const MainProfileContent = () => {
  const router = useRouter()

  const { query } = router

  const [currentCursor, setCurrentCursor] = useState<number | undefined>(undefined)
  const { data: me } = useMeQuery()
  const { data } = useGetMyProfileQuery(undefined, { skip: !me })
  const { data: posts, isFetching } = useGetMyPostsQuery({ cursor: currentCursor }, { skip: !me })
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

  return (
    <SidebarLayout>
      <ProfileInfo
        myProfile
        ownerId={data?.id}
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
        isOwner
        openPostDetailsModal={openPostDetailsModal}
        setCurrentPost={setCurrentPost}
        setOpenPostDetailsModal={setOpenPostDetailsModal}
      />
    </SidebarLayout>
  )
}

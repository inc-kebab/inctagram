import { useRef, useState } from 'react'

import { PostItem, PostsList, PostsListSkeleton } from '@/entities/post'
import { ProfileInfo } from '@/entities/profile'
import { PostDetailsDialogs, useGetUsersPostsQuery } from '@/feature/post'
import { useGetPublicProfileQuery } from '@/feature/profile'
import { useInfinityScroll } from '@/shared/hooks/useInfinityScroll'
import { PublicLayout, SidebarLayout } from '@/widgets/layout'
import { useRouter } from 'next/router'

type Props = {
  publicProfile?: boolean
}

export const SomeUserProfile = ({ publicProfile = false }: Props) => {
  const { isReady, query } = useRouter()

  const triggerRef = useRef<HTMLDivElement | null>(null)

  const [currentPost, setCurrentPost] = useState<Nullable<PostItem>>(null)
  const [cursor, setCursor] = useState<number | undefined>(undefined)
  const [openPostDetailsModal, setOpenPostDetailsModal] = useState(false)

  const { data: userData } = useGetPublicProfileQuery(Number(query.id), { skip: !isReady })
  const { data: posts, isFetching } = useGetUsersPostsQuery({ cursor, userId: Number(query.id) })

  const handleChangeCurrentPost = (post: PostItem) => {
    setCurrentPost(post)
    setOpenPostDetailsModal(true)
  }

  useInfinityScroll({
    callback: () => setCursor(posts?.cursor),
    hasMore: posts?.hasMore,
    triggerRef,
  })

  const content = (
    <>
      <ProfileInfo
        myProfile={false}
        userData={{
          aboutMe: userData?.aboutMe,
          avatar: userData?.avatars?.['avatar-medium']?.url,
          username: userData?.username,
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

  return publicProfile ? (
    <PublicLayout>{content}</PublicLayout>
  ) : (
    <SidebarLayout>{content}</SidebarLayout>
  )
}

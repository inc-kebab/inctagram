import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

import { PostItem, PostsList, PostsListSkeleton } from '@/entities/post'
import { ProfileInfo } from '@/entities/profile'
import { PostDetailsDialogs, invalidateTagsPost, useGetMyPostsQuery } from '@/feature/post'
import { useGetMyProfileQuery } from '@/feature/profile'
import { useInfinityScroll } from '@/shared/hooks/useInfinityScroll'
import { Page } from '@/shared/types/layout'
import { Loader } from '@/shared/ui/Loader'
import { SidebarLayout } from '@/widgets/layout'

import s from './Profile.module.scss'

const Profile: Page = () => {
  const triggerRef = useRef<HTMLDivElement | null>(null)

  const [cursor, setCursor] = useState<number | undefined>(undefined)

  const [currentPost, setCurrentPost] = useState<Nullable<PostItem>>(null)
  const [openPostDetailsModal, setOpenPostDetailsModal] = useState(false)

  const handleChangeCurrentPost = (post: PostItem) => {
    setCurrentPost(post)
    setOpenPostDetailsModal(true)
  }

  const { data, isLoading } = useGetMyProfileQuery()
  const { data: posts, isFetching, isLoading: isPostsLoad } = useGetMyPostsQuery({ cursor })

  const dispatch = useDispatch()

  useInfinityScroll({
    callback: () => setCursor(posts?.cursor),
    hasMore: posts?.hasMore,
    triggerRef,
  })

  useEffect(() => {
    return () => {
      dispatch(invalidateTagsPost(['myPosts']))
    }
  }, [dispatch])

  if (isLoading) {
    return <Loader containerHeight />
  }

  return (
    <>
      <ProfileInfo
        className={s.info}
        userData={{
          aboutMe: data?.aboutMe,
          avatar: data?.avatars?.['avatar-medium']?.url,
          username: data?.username,
        }}
      />
      {isPostsLoad ? (
        <PostsListSkeleton count={8} />
      ) : (
        <>
          <PostsList
            cursor={posts?.cursor}
            list={posts?.items}
            onSetCurrentPost={handleChangeCurrentPost}
            ref={triggerRef}
          />
          {isFetching && <PostsListSkeleton />}
        </>
      )}
      <PostDetailsDialogs
        currentPost={currentPost}
        openPostDetailsModal={openPostDetailsModal}
        setCurrentPost={setCurrentPost}
        setOpenPostDetailsModal={setOpenPostDetailsModal}
      />
    </>
  )
}

Profile.getLayout = (page, t) => {
  return (
    <SidebarLayout description={t.pages.profile.metaDescription} title={t.pages.profile.metaTitle}>
      {page}
    </SidebarLayout>
  )
}

export default Profile

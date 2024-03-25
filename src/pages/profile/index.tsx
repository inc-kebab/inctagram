import { ProfileInfo } from '@/entities/profile'
import { Posts, useGetMyPostsQuery } from '@/feature/post'
import { useGetMyProfileQuery } from '@/feature/profile'
import { Page } from '@/shared/types/layout'
import { Loader } from '@/shared/ui/Loader'
import { SidebarLayout } from '@/widgets/layout'

import s from './Profile.module.scss'

const Profile: Page = () => {
  const { data, isLoading } = useGetMyProfileQuery()
  const { data: posts, isLoading: isPostsLoad } = useGetMyPostsQuery()

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
      {isPostsLoad ? <Loader /> : <Posts list={posts?.items} />}
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

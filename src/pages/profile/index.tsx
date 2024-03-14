import { ReactElement } from 'react'

import { ProfileInfo } from '@/entities/profile'
import { useGetMyPostsQuery } from '@/feature/posts/api/posts-api'
import { useGetMyProfileQuery } from '@/feature/profile'
import { Page } from '@/shared/types/layout'
import { Loader } from '@/shared/ui/Loader'
import { SidebarLayout } from '@/widgets/layout'

import s from './Profile.module.scss'

const Profile: Page = () => {
  const { data, isLoading } = useGetMyProfileQuery()
  const { data: posts } = useGetMyPostsQuery(null)

  console.log('posts', posts)
  console.log('data', data)

  if (isLoading) {
    return <Loader fullHeight />
  }

  return (
    <>
      <ProfileInfo
        className={s.root}
        userData={{
          aboutMe: data?.aboutMe,
          avatar: data?.avatars?.['avatar-medium']?.url,
          username: data?.username,
        }}
      />
      <hr />
      {/*отображение постов в виде картинок*/}
      <div>{posts?.items.map(item => <img key={item.id} src={item.images[0].url} />)}</div>
    </>
  )
}

Profile.getLayout = (page: ReactElement) => {
  return <SidebarLayout>{page}</SidebarLayout>
}

export default Profile

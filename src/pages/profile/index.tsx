import { ReactElement } from 'react'

import { ProfileInfo } from '@/entities/profile'
import { useGetMyProfileQuery } from '@/feature/profile'
import { Page } from '@/shared/types/layout'
import { Loader } from '@/shared/ui/Loader'
import { SidebarLayout } from '@/widgets/layout'

import s from './Profile.module.scss'

const Profile: Page = () => {
  const { data, isLoading } = useGetMyProfileQuery()

  if (isLoading) {
    return <Loader fullHeight />
  }

  return (
    <ProfileInfo
      className={s.info}
      userData={{
        aboutMe: data?.aboutMe,
        avatar: data?.avatars?.['avatar-medium']?.url,
        username: data?.username,
      }}
    />
  )
}

Profile.getLayout = (page: ReactElement) => {
  return <SidebarLayout>{page}</SidebarLayout>
}

export default Profile

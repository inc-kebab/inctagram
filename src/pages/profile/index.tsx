import { ReactElement } from 'react'

import { useGetMyProfileQuery } from '@/feature/profile'
import { AppRoutes } from '@/shared/const/routes'
import { Page } from '@/shared/types/layout'
import { Button } from '@/shared/ui/Button'
import { Loader } from '@/shared/ui/Loader'
import { SidebarLayout } from '@/widgets/layout'
import Link from 'next/link'

const Profile: Page = () => {
  const { data, isLoading } = useGetMyProfileQuery()

  if (isLoading) {
    return <Loader />
  }

  return (
    <div>
      <div>username {data?.username}</div>
      <div>firstName {data?.firstName}</div>
      <div>lastName {data?.lastName}</div>
      <div>aboutMe {data?.aboutMe}</div>
      <Button asComponent={Link} href={AppRoutes.PROFILE_SETTINGS} variant="secondary">
        Profile settings
      </Button>
    </div>
  )
}

Profile.getLayout = (page: ReactElement) => {
  return <SidebarLayout>{page}</SidebarLayout>
}

export default Profile

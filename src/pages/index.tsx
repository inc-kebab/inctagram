import { wrapper } from '@/app/store/store'
import { CounterRegisteredUsers } from '@/entities/user'
import {
  PublicPostsList,
  getAllPublicPosts,
  useGetAllPublicPostsQuery,
} from '@/feature/public-posts'
import { getTotalProfileCount, useGetTotalProfileCountQuery } from '@/feature/public-profile'
import { publicProfileApi } from '@/feature/public-profile/api/public-profile-api'
import { DefenderAuthRoute } from '@/shared/helpers/hoc'
import { Page } from '@/shared/types/layout'
import { PublicLayout } from '@/widgets/layout'

import s from './mainPublic.module.scss'

export const getStaticProps = wrapper.getStaticProps(store => async () => {
  store.dispatch(
    getTotalProfileCount.initiate(undefined, {
      forceRefetch: true,
    })
  )
  store.dispatch(
    getAllPublicPosts.initiate(
      { pageSize: 4, sortDirection: 'desc' },
      {
        forceRefetch: true,
      }
    )
  )

  const allRes = await Promise.all(store.dispatch(publicProfileApi.util.getRunningQueriesThunk()))

  //? don't checked work
  if (!allRes) {
    return {
      notFound: true,
    }
  }

  return {
    props: {},
    revalidate: 60,
  }
})

const Public: Page = () => {
  const { data } = useGetTotalProfileCountQuery()
  const { data: dataPosts } = useGetAllPublicPostsQuery({ pageSize: 4, sortDirection: 'desc' })

  return (
    <div className={s.container}>
      <CounterRegisteredUsers count={data?.totalUsersCount} />
      <PublicPostsList posts={dataPosts?.items} />
    </div>
  )
}

Public.getLayout = (page, t) => {
  return <PublicLayout title={t.pages.main.metaTitle}>{page}</PublicLayout>
}
export default DefenderAuthRoute(Public)

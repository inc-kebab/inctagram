import { wrapper } from '@/app'
import { PublicPostsList } from '@/entities/post'
import { CounterRegisteredUsers } from '@/entities/user'
import { getAllPublicPosts, useGetAllPublicPostsQuery } from '@/feature/post'
import { getTotalUsersCount, useGetTotalUsersCountQuery } from '@/feature/profile'
import { getRunningQueriesThunk } from '@/shared/api/base-api'
import { DefenderAuthRoute } from '@/shared/helpers/hoc'
import { Page } from '@/shared/types/layout'
import { PublicLayout } from '@/widgets/layout'

import s from './index.module.scss'

export const getStaticProps = wrapper.getStaticProps(store => async () => {
  store.dispatch(getTotalUsersCount.initiate(undefined, { forceRefetch: true }))
  store.dispatch(getAllPublicPosts.initiate({}, { forceRefetch: true }))

  const allRes = await Promise.all(store.dispatch(getRunningQueriesThunk()))

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
  const { data } = useGetTotalUsersCountQuery()
  const { data: dataPosts } = useGetAllPublicPostsQuery({})

  return (
    <div className={s.container}>
      <CounterRegisteredUsers className={s.users} count={data?.totalUsersCount} />
      <PublicPostsList posts={dataPosts?.items} />
    </div>
  )
}

Public.getLayout = (page, t) => {
  return <PublicLayout title={t.pages.main.metaTitle}>{page}</PublicLayout>
}
export default DefenderAuthRoute(Public)

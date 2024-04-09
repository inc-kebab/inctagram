import { wrapper } from '@/app'
import { PublicPostsList } from '@/entities/post'
import { CounterRegisteredUsers } from '@/entities/user'
import { GetMyPostsArgs, getAllPublicPosts, useGetAllPublicPostsQuery } from '@/feature/post'
import { getTotalUsersCount, useGetTotalUsersCountQuery } from '@/feature/profile'
import { getRunningQueriesThunk } from '@/shared/api/base-api'
import { Page } from '@/shared/types/layout'
import { PublicLayout } from '@/widgets/layout'

import s from './index.module.scss'

const argsForPublicPosts: GetMyPostsArgs = { pageSize: 4, sortDirection: 'desc' }

export const getStaticProps = wrapper.getStaticProps(store => async () => {
  store.dispatch(getTotalUsersCount.initiate(undefined, { forceRefetch: true }))
  store.dispatch(getAllPublicPosts.initiate(argsForPublicPosts, { forceRefetch: true }))

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
  const { data: dataPosts } = useGetAllPublicPostsQuery(argsForPublicPosts)

  return (
    <PublicLayout>
      <div className={s.container}>
        <CounterRegisteredUsers className={s.users} count={data?.totalUsersCount} />
        <PublicPostsList posts={dataPosts?.items} />
      </div>
    </PublicLayout>
  )
}

export default Public

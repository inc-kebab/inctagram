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

// TODO попробуй сделать страницу доступной для всех

export const getStaticProps = wrapper.getStaticProps(store => async () => {
  const users = await store.dispatch(getTotalUsersCount.initiate(undefined, { forceRefetch: true }))
  const posts = await store.dispatch(getAllPublicPosts.initiate({}, { forceRefetch: true }))

  if (!posts || !users) {
    return { props: {} } //TODO добавить данные об ошибке
  }

  await Promise.all(store.dispatch(getRunningQueriesThunk()))

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

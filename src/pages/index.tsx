import { wrapper } from '@/app/store/store'
import { CounterRegisteredUsers } from '@/entities/user'
import { PostItem, PublicPostsList, getPublicPosts } from '@/feature/public-posts'
import { getTotalProfileCount } from '@/feature/public-profile'
import { baseApi } from '@/shared/api/base-api'
import { DefenderAuthRoute } from '@/shared/helpers/hoc/DefenderAuthRoute'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Page } from '@/shared/types/layout'
import { PublicLayout } from '@/widgets/layout'

import s from './mainPublic.module.scss'

export const getStaticProps = wrapper.getStaticProps(store => async () => {
  const resUsers = await store.dispatch(getTotalProfileCount.initiate())
  const resPosts = await store.dispatch(
    getPublicPosts.initiate({ pageSize: 4, sortDirection: 'desc' })
  )

  const posts = resPosts.data?.items
  const countUsers = resUsers.data?.totalUsersCount

  await Promise.all(store.dispatch(baseApi.util.getRunningQueriesThunk()))

  return {
    props: {
      countUsers,
      posts,
    },
    revalidate: 60,
  }
})

type Props = {
  countUsers: number
  posts: PostItem[]
}

const Public: Page<Props> = ({ countUsers, posts }) => {
  // const { t } = useTranslation()

  return (
    <div className={s.container}>
      <CounterRegisteredUsers count={countUsers} />
      <PublicPostsList posts={posts} />
    </div>
  )
}

Public.getLayout = (page, t) => {
  return <PublicLayout title={t.pages.main.metaTitle}>{page}</PublicLayout>
}

export default Public
// export default DefenderAuthRoute(Public)

import { wrapper } from '@/app/store/store'
import { CounterRegisteredUsers } from '@/entities/user'
import {
  PublicPostsList,
  getAllPublicPosts,
  useGetAllPublicPostsQuery,
} from '@/feature/public-posts'
import { getTotalProfileCount, useGetTotalProfileCountQuery } from '@/feature/public-profile'
import { publicProfileApi } from '@/feature/public-profile/api/public-profile-api'
import { revalidate } from '@/pages/api/revalidate'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { PublicLayout } from '@/widgets/layout'

import s from './mainPublic.module.scss'

export const getStaticProps = wrapper.getStaticProps(store => async () => {
  store.dispatch(getTotalProfileCount.initiate(undefined, { forceRefetch: 5 }))
  // store.dispatch(getTotalProfileCount.initiate(undefined, { forceRefetch: true }))
  store.dispatch(
    getAllPublicPosts.initiate({ pageSize: 4, sortDirection: 'desc' }, { forceRefetch: 5 })
  )
  // store.dispatch(
  //   getAllPublicPosts.initiate({ pageSize: 4, sortDirection: 'desc' }, { forceRefetch: true })
  // )

  await Promise.all(store.dispatch(publicProfileApi.util.getRunningQueriesThunk()))

  return {
    props: {},
    // revalidate: 5,
  }
})

const Public = () => {
  const { data } = useGetTotalProfileCountQuery()
  const posts = useGetAllPublicPostsQuery({ pageSize: 4, sortDirection: 'desc' }).data?.items
  const { t } = useTranslation()

  const handler = () => {
    fetch('/api/revalidate?secret=eKYdp4DByptcg8wbxJKsHrz4IT2ozqVM', { method: 'GET' })
  }

  return (
    <PublicLayout title={t.pages.main.metaTitle}>
      <div className={s.container}>
        <CounterRegisteredUsers count={data?.totalUsersCount} />
        <PublicPostsList posts={posts} />
      </div>
      <button onClick={handler}>reval</button>
    </PublicLayout>
  )
}

export default Public

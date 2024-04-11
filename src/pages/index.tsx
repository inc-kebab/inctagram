import { brotliDecompress } from 'node:zlib'

import { wrapper } from '@/app'
import { PublicPostsList } from '@/entities/post'
import { CounterRegisteredUsers } from '@/entities/user'
import { useMeQuery } from '@/feature/auth'
import { getAllPublicPosts, useGetAllPublicPostsQuery } from '@/feature/post'
import { getTotalUsersCount, useGetTotalUsersCountQuery } from '@/feature/profile'
import { getRunningQueriesThunk } from '@/shared/api/base-api'
import { DefenderAuthRoute } from '@/shared/helpers/hoc'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Page } from '@/shared/types/layout'
import { Notification } from '@/shared/ui/Notification'
import { PublicLayout } from '@/widgets/layout'
import { GetStaticPropsResult } from 'next'

import s from './index.module.scss'

// TODO попробуй сделать страницу доступной для всех

type ErrorArgs = {
  isPostsError?: boolean
  isUsersError?: boolean
}

export const getStaticProps = wrapper.getStaticProps(
  store => async (): Promise<GetStaticPropsResult<ErrorArgs>> => {
    const users = await store.dispatch(
      getTotalUsersCount.initiate(undefined, { forceRefetch: true })
    )
    const posts = await store.dispatch(getAllPublicPosts.initiate({}, { forceRefetch: true }))

    await Promise.all(store.dispatch(getRunningQueriesThunk()))
    if (!posts) {
      return {
        props: {
          isPostsError: true,
        },
        revalidate: 60,
      }
    }

    if (!users) {
      return {
        props: {
          isUsersError: true,
        },
        revalidate: 60,
      }
    }

    return {
      props: {},
      revalidate: 60,
    }
  }
)

type Props = {
  isPostsError?: boolean
  isUsersError?: boolean
}

const Public: Page = ({ isPostsError, isUsersError }: Props) => {
  const { t } = useTranslation()
  const { data } = useGetTotalUsersCountQuery()
  const { data: dataPosts } = useGetAllPublicPostsQuery({})
  const { data: currentUser } = useMeQuery()

  return (
    <PublicLayout currentUser={currentUser} title={t.pages.main.metaTitle}>
      <div className={s.container}>
        {isUsersError ? (
          <Notification className={s.notification} error={t.pages.main.ssgErrorUsersCount} />
        ) : (
          <CounterRegisteredUsers className={s.users} count={data?.totalUsersCount} />
        )}
        {isPostsError ? (
          <Notification className={s.notification} error={t.pages.main.ssgErrorPosts} />
        ) : (
          <PublicPostsList posts={dataPosts?.items} />
        )}
      </div>
    </PublicLayout>
  )
}

export default Public

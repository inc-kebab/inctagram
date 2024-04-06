import { store } from '@/app'
import { CounterRegisteredUsers } from '@/entities/user'
import { publicApi, useGetAllPublicPostsQuery } from '@/feature/public/api/public-api'
import { GetPostsResponse } from '@/feature/public/model/types/public-types'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Page } from '@/shared/types/layout'
import { PublicLayout } from '@/widgets/layout'
import Image from 'next/image'
import Link from 'next/link'

export const getStaticProps = async () => {
  const getAllPosts = await store.dispatch(
    publicApi.endpoints.getAllPublicPosts.initiate(undefined)
  )

  store.dispatch(publicApi.util.getRunningQueriesThunk())

  const allPosts = getAllPosts.data

  if (!allPosts) {
    return { notFound: true }
  }

  return {
    props: {
      allPosts,
    },
    revalidate: 60,
  }
}

const Public = ({ allPosts }: { allPosts: GetPostsResponse }) => {
  const { t } = useTranslation()

  return (
    <PublicLayout title={t.pages.main.metaTitle}>
      <main
        style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          justifyContent: 'space-around',
        }}
      >
        <CounterRegisteredUsers count={12} />
        <div style={{ display: 'flex', gap: '13px' }}>
          {allPosts?.items.slice(0, 4).map(item => (
            <div key={item.id}>
              <Image alt="" height={200} src={item.images[0].url} width={200} />
              <Link href={`public/${item.ownerId}`}>
                <h2>{item.username}</h2>
              </Link>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </main>
    </PublicLayout>
  )
}

export default Public

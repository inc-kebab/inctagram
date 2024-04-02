import { useEffect, useState } from 'react'

import { CounterRegisteredUsers } from '@/entities/user'
import { useMeQuery } from '@/feature/auth'
import { useGetAllPublicPostsQuery } from '@/feature/public/api/public-api'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Page } from '@/shared/types/layout'
import { Loader } from '@/shared/ui/Loader'
import { PublicLayout } from '@/widgets/layout'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Public: Page = () => {
  const [loading, setLoading] = useState(true)

  const { push } = useRouter()

  const { data } = useMeQuery()

  const { t } = useTranslation()
  const { data: allPosts } = useGetAllPublicPostsQuery()

  useEffect(() => {
    if (data) {
      void push('/home')
    } else {
      setLoading(false)
    }
  }, [data, push])

  if (loading) {
    return <Loader fullHeight />
  }

  return (
    <PublicLayout title={t.pages.main.metaTitle}>
      <main style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-around' }}>
        <CounterRegisteredUsers count={12} />
        {allPosts?.items.slice(0, 4).map(item => (
          <div key={item.id}>
            <Image alt="" height={200} src={item.images[0].url} width={200} />
            <Link href={`public/${item.ownerId}`}>
              <h2>{item.username}</h2>
            </Link>
            <p>{item.description}</p>
          </div>
        ))}
      </main>
    </PublicLayout>
  )
}

export default Public

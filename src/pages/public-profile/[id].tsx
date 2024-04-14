import { wrapper } from '@/app'
import { me } from '@/feature/auth'
import { getPublicPost, getUsersPosts } from '@/feature/post'
import { getPublicProfile } from '@/feature/profile'
import { baseApi } from '@/shared/api'
import { AppRoutes } from '@/shared/const/routes'
import { SomeProfileContent } from '@/widgets/profile'

export const getServerSideProps = wrapper.getServerSideProps(store => async context => {
  const userId = context.params?.id as string | undefined
  const postId = context.query?.post as string | undefined

  if (!userId || isNaN(+userId)) {
    return { notFound: true }
  }

  if (postId) {
    const response = await store.dispatch(
      getPublicPost.initiate({ postId: Number(postId), userId })
    )

    if (!response.data) {
      return { notFound: true }
    }
  }

  const meResponse = await store.dispatch(me.initiate(undefined))
  const queryPostId = postId ? `?post=${postId}` : ''

  if (meResponse.data) {
    return {
      redirect: {
        destination: AppRoutes.PROFILE + `/${userId}` + queryPostId,
        permanent: false,
      },
    }
  }

  store.dispatch(getUsersPosts.initiate({ userId: Number(userId) }))
  store.dispatch(getPublicProfile.initiate(Number(userId)))

  const allRes = await Promise.all(store.dispatch(baseApi.util.getRunningQueriesThunk()))

  if (!allRes) {
    return { notFound: true }
  }

  return { props: {} }
})

const PublicProfile = () => <SomeProfileContent isPublicPage />

export default PublicProfile

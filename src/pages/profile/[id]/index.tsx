import { wrapper } from '@/app'
import { me } from '@/feature/auth'
import { getMyPosts, getPublicPost, getUsersPosts } from '@/feature/post'
import { getMyProfile, getPublicProfile } from '@/feature/profile'
import { baseApi } from '@/shared/api/base-api'
import { AppRoutes } from '@/shared/const/routes'
import { MainProfileContent, SomeProfileContent } from '@/widgets/profile'

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

  const token = context.req.cookies.accessToken

  const meResponse = await store.dispatch(me.initiate(undefined))

  const queryPostId = postId ? `?post=${postId}` : ''

  if (!meResponse.data) {
    // TODO refresh-token

    return {
      redirect: {
        destination: AppRoutes.PUBLIC_PROFILE + `/${userId}` + queryPostId,
        permanent: false,
      },
    }
  }
  const isMyProfile = Number(userId) === meResponse.data.id

  if (isMyProfile) {
    await store.dispatch(getMyPosts.initiate({}))
    await store.dispatch(getMyProfile.initiate(undefined))
  } else {
    await store.dispatch(getUsersPosts.initiate({ userId: Number(userId) }))
    await store.dispatch(getPublicProfile.initiate(Number(userId)))
  }

  const allRes = await Promise.all(store.dispatch(baseApi.util.getRunningQueriesThunk()))

  if (!allRes) {
    return { notFound: true }
  }

  return { props: { isMyProfile } }
})

interface Props {
  isMyProfile: boolean
}

const Profile = ({ isMyProfile }: Props) =>
  isMyProfile ? <MainProfileContent /> : <SomeProfileContent />

export default Profile

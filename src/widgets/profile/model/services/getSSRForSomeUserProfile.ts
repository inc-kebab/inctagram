import { wrapper } from '@/app'
import { meSSR } from '@/feature/auth'
import { getPublicPost, getUsersPosts } from '@/feature/post'
import { getPublicProfile } from '@/feature/profile'
import { baseApi } from '@/shared/api/base-api'
import { AppRoutes } from '@/shared/const/routes'
import { getTokenFromHeaders } from '@/shared/helpers/getTokenFromHeaders'

export const getSSRForSomeUserProfile = (publicPage: boolean) =>
  wrapper.getServerSideProps(store => async context => {
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
    const token = getTokenFromHeaders(context.req.headers.cookie)

    const meResponse = await store.dispatch(meSSR.initiate({ token }))
    const queryPostId = postId ? `?post=${postId}` : ''

    if (publicPage) {
      if (meResponse.data) {
        return {
          redirect: {
            destination: AppRoutes.PROFILE + `/${userId}` + queryPostId,
            permanent: false,
          },
        }
      }
    } else {
      if (!meResponse.data) {
        return {
          redirect: {
            destination: AppRoutes.PUBLIC_PROFILE + `/${userId}` + queryPostId,
            permanent: false,
          },
        }
      }

      const isMyProfile = Number(userId) === meResponse.data.id

      if (isMyProfile) {
        return {
          redirect: {
            destination: AppRoutes.MY_PROFILE + queryPostId,
            permanent: false,
          },
        }
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

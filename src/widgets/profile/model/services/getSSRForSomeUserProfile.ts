import { wrapper } from '@/app'
import { meSSR } from '@/feature/auth'
import { publicApi } from '@/feature/public/api/public-api'
import { baseApi } from '@/shared/api/base-api'
import { AppRoutes } from '@/shared/const/routes'
import { getTokenFromHeaders } from '@/shared/helpers/getTokenFromHeaders'

export const getSSRForSomeUserProfile = (publicPage: boolean) =>
  wrapper.getServerSideProps(store => async context => {
    const userId = context.params?.id as string | undefined

    if (!userId || isNaN(+userId)) {
      return { notFound: true }
    }

    const token = getTokenFromHeaders(context.req.headers.cookie)

    const meResponse = await store.dispatch(meSSR.initiate({ token }))

    if (publicPage) {
      if (meResponse.data) {
        return {
          redirect: {
            destination: AppRoutes.PROFILE + `/${userId}`,
            permanent: false,
          },
        }
      }
    } else {
      if (!meResponse.data) {
        return {
          redirect: {
            destination: AppRoutes.PUBLIC_PROFILE + `/${userId}`,
            permanent: false,
          },
        }
      }

      const isMyProfile = Number(userId) === meResponse.data.id

      if (isMyProfile) {
        return {
          redirect: {
            destination: `/my-profile`,
            permanent: false,
          },
        }
      }
    }

    store.dispatch(publicApi.endpoints.getUsersPosts.initiate({ userId: Number(userId) }))
    store.dispatch(publicApi.endpoints.getPublicProfile.initiate(Number(userId)))

    const allRes = await Promise.all(store.dispatch(baseApi.util.getRunningQueriesThunk()))

    if (!allRes) {
      return { notFound: true }
    }

    return { props: {} }
  })

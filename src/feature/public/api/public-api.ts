import {GetProfileResponse} from '@/feature/profile/model/types/profile.types';
import { baseApi } from "@/shared/api/base-api";

import { GetAllUsersParams, GetPostsResponse, PublicParams } from "../model/types/public-types";

export const publicApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAllPublicPosts: builder.query<GetPostsResponse, PublicParams>({
      query: (params) => ({  params, url: "/public-posts/all" })
    }),
    getPublicProfile: builder.query<GetProfileResponse, number>({
      query: (userId) => ({ url: `/public-profile/${userId}` })
    }),
    getUsersPosts: builder.query<GetPostsResponse, GetAllUsersParams>({
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.userId !== previousArg?.userId || currentArg?.cursor !== previousArg?.cursor
      },
      merge: (cache, res) => {
        if (cache.totalCount !== res.totalCount) {
         return res
         }
        
        if (cache) {
          cache.items.push(...res.items)
          cache.cursor = res.cursor
          cache.hasMore = res.hasMore
        } else {
          return res
        }
      },
      providesTags: (_, error) => (error ? [] : ['posts']),
      query: ({userId, ...rest}) => ({ params: rest, url: `/public-posts/user/${userId}` }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
     })
  })
});

export const { useGetAllPublicPostsQuery, useGetPublicProfileQuery, useGetUsersPostsQuery } = publicApi;

export const { invalidateTags: invalidateTagsPublic } = publicApi.util;



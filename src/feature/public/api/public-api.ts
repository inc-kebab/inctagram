import { baseApi } from "@/shared/api/base-api";

import { GetAllUsersParams, GetPostsResponse, PublicParams } from "../model/types/public-types";

export const publicApi = baseApi.injectEndpoints({ 
  endpoints: builder => ({
    getAllPublicPosts: builder.query<GetPostsResponse, PublicParams>({
      query: (params) => ({  params, url: "/public-posts/all" })
    }), 
    getAllUsersPosts: builder.query<GetPostsResponse, GetAllUsersParams>({
      providesTags: (_, error) => (error ? [] : ["public"]),
      query: (params) => ({ params, url: `/public-posts/user/${params.userId}` }),      
     }),
    getPublicProfile: builder.query<GetPostsResponse, number>({
      query: (userId) => ({ url: `/public-profile/${userId}` })
    })
  })
});

export const { useGetAllPublicPostsQuery, useGetAllUsersPostsQuery, useGetPublicProfileQuery } = publicApi;

export const { invalidateTags: invalidateTagsPublic } = publicApi.util;



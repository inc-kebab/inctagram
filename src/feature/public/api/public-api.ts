import { GetPostsResponse } from "@/feature/public/model/types/public";
import { baseApi } from "@/shared/api/base-api";

export const publicApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAllPublicPosts: builder.query<GetPostsResponse, void >({
      query: ()  => ({  url: '/public-posts/all' })
    }),
    getAllUsersPosts: builder.query<GetPostsResponse, number >({
      query: (userId)  => ({  url: `/public-posts/user/${userId}` })
    }),
    getPublicProfile: builder.query<GetPostsResponse, number >({
      query: (userId)  => ({  url: `/public-profile/${userId}` })
    }), 
  }),  
}) 

export const {useGetAllPublicPostsQuery, useGetAllUsersPostsQuery, useGetPublicProfileQuery } = publicApi


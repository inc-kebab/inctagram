import { ReactElement, useEffect, useRef, useState } from "react";

import { store, useAppDispatch } from "@/app";
import { PostItem, PostsList } from "@/entities/post";
import { ProfileInfo } from "@/entities/profile";
import { PostDetailsDialogs } from "@/feature/post";
import { invalidateTagsPublic, publicApi, useGetAllUsersPostsQuery } from "@/feature/public/api/public-api";
import { GetPostsResponse, GetPublicProfileResponse, Items } from "@/feature/public/model/types/public-types";
import { useInfinityScroll } from "@/shared/hooks/useInfinityScroll";
import { PublicLayout } from "@/widgets/layout";
import { GetServerSidePropsContext } from "next";


export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const ownerId = context.params?.ownerId;

  const [getAllUsersPostsResponse, getPublicProfileResponse] = await Promise.all([
    store.dispatch(publicApi.endpoints.getAllUsersPosts.initiate({ userId: Number(ownerId)})),
    store.dispatch(publicApi.endpoints.getPublicProfile.initiate(Number(ownerId)))
  ]);

  store.dispatch(publicApi.util.getRunningQueriesThunk());

  const allUsersPosts = getAllUsersPostsResponse.data;
  const publicProfile = getPublicProfileResponse.data;

  if (!allUsersPosts || !publicProfile) {
    return { notFound: true };
  }



  // const [getAllUsersPostsResponse, getPublicProfileResponse, ] = await Promise.all([
  //   fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/public-posts/user/${Number(ownerId)}`),
  //   fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/public-profile/${Number(ownerId)}`)
  // ]);
  // const [ allUsersPosts, publicProfile] = await Promise.all([
  // getAllUsersPostsResponse.json(),
  // getPublicProfileResponse.json()
  // ]);

  // if (!allUsersPosts || !publicProfile) {
  //   return { notFound: true };
  // }


  return {
    props: {
      allUsersPosts, ownerId, publicProfile
    }
  };
};




const OwnerPage = ({ allUsersPosts, ownerId, publicProfile }: {
  allUsersPosts: GetPostsResponse,
  ownerId: number
  publicProfile: GetPublicProfileResponse
}) => {
  const dispatch = useAppDispatch()
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const [postsList, setPostsList] = useState<Items[]>(allUsersPosts.items);
  const [cursor, setCursor] = useState<number | undefined>(undefined);
  const [currentPost, setCurrentPost] = useState<Nullable<PostItem>>(null);
  const [openPostDetailsModal, setOpenPostDetailsModal] = useState(false);

  const { data: posts, isFetching, isLoading } = useGetAllUsersPostsQuery({ cursor , userId: ownerId})

  const handleChangeCurrentPost = (post: PostItem) => {
    setCurrentPost(post);
    setOpenPostDetailsModal(true);
  };

  useInfinityScroll({
    callback: () => {
      if (posts) {
        setPostsList(prevPosts => [...prevPosts, ...posts.items]);
        setCursor(posts.cursor);
      }
    },
    // callback: () =>  setCursor(allUsersPosts.cursor),
    hasMore: allUsersPosts?.hasMore,
    triggerRef
  });


  return (
    <PublicLayout>
      <ProfileInfo
        myProfile={false}
        userData={{
          aboutMe: publicProfile.aboutMe,
          avatar: publicProfile?.avatars?.["avatar-medium"]?.url,
          username: publicProfile?.username
        }}
      />
      <PostsList
        cursor={posts?.cursor}
        list={postsList}
        onSetCurrentPost={handleChangeCurrentPost}
        ref={triggerRef}
      />
      <PostDetailsDialogs
        currentPost={currentPost}
        openPostDetailsModal={openPostDetailsModal}
        setCurrentPost={setCurrentPost}
        setOpenPostDetailsModal={setOpenPostDetailsModal}
      />
    </PublicLayout>
  );
};

export default OwnerPage;

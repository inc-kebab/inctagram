import { useEffect, useRef, useState } from "react";

import { store } from "@/app";
import { PostItem, PostsList, PostsListSkeleton } from "@/entities/post";
import { ProfileInfo } from "@/entities/profile";
import { authApi } from "@/feature/auth/api/auth-api";
import { PostDetailsDialogs } from "@/feature/post";
import { publicApi, useGetAllUsersPostsQuery } from "@/feature/public/api/public-api";
import { GetPostsResponse, GetPublicProfileResponse, Items } from "@/feature/public/model/types/public-types";
import { useInfinityScroll } from "@/shared/hooks/useInfinityScroll";
import { PublicLayout } from "@/widgets/layout";
import { GetServerSidePropsContext } from "next";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const ownerId = context.params?.ownerId;

  const meResponse = await store.dispatch(authApi.endpoints.me.initiate());

  if (meResponse.data) {
    return {
      redirect: {
        destination: `/profile/${ownerId}`
      }
    };
  }


  const [getAllUsersPostsResponse, getPublicProfileResponse] = await Promise.all([
    store.dispatch(publicApi.endpoints.getAllUsersPosts.initiate({ userId: Number(ownerId) })),
    store.dispatch(publicApi.endpoints.getPublicProfile.initiate(Number(ownerId)))
  ]);


  await Promise.all([store.dispatch(publicApi.util.getRunningQueriesThunk()), store.dispatch(authApi.util.getRunningQueriesThunk())]);

  const isPostsLoad = getAllUsersPostsResponse.isLoading || getPublicProfileResponse.isLoading;
  const allUsersPosts = getAllUsersPostsResponse.data;
  const publicProfile = getPublicProfileResponse.data;


  if (!allUsersPosts || !publicProfile) {
    return { notFound: true };
  }

  return {
    props: {
      allUsersPosts, isPostsLoad, ownerId, publicProfile
    }
  };
};

const OwnerPage = ({ allUsersPosts, isPostsLoad, ownerId, publicProfile }: {
  allUsersPosts: GetPostsResponse,
  isPostsLoad: boolean
  ownerId: number
  publicProfile: GetPublicProfileResponse
}) => {
  const triggerRef = useRef<HTMLDivElement | null>(null);

  const [postsList, setPostsList] = useState<Items[]>(allUsersPosts.items);
  const [currentPost, setCurrentPost] = useState<Nullable<PostItem>>(null);

  const [cursor, setCursor] = useState<number | undefined>(undefined);

  const [openPostDetailsModal, setOpenPostDetailsModal] = useState(false);

  const { data: posts, isFetching, isLoading } = useGetAllUsersPostsQuery({
    cursor,
    userId: ownerId
  }, { skip: cursor === undefined }); // если убрать skip тоже работает

  const handleChangeCurrentPost = (post: PostItem) => {
    setCurrentPost(post);
    setOpenPostDetailsModal(true);
  };

  useEffect(() => {
    setPostsList(prevPosts => {
      if (posts && posts.items) {
        return [...prevPosts, ...posts.items];
      }

      return prevPosts;
    });
  }, [posts]);

  useInfinityScroll({
    callback: () => setCursor(prev => prev ? posts?.cursor : allUsersPosts.cursor),
    hasMore: posts ? posts.hasMore : allUsersPosts?.hasMore,
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
      {isPostsLoad ? (
        <PostsListSkeleton count={8} />
      ) : (
        <>
          <PostsList
            cursor={cursor ? posts?.cursor : allUsersPosts.cursor}
            list={postsList}
            onSetCurrentPost={handleChangeCurrentPost}
            ref={triggerRef}
          />
          {isFetching && <PostsListSkeleton />}
        </>)
      }

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

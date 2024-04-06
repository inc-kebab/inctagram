import { useEffect, useRef, useState } from "react";

import { store } from "@/app";
import { PostItem, PostsList } from "@/entities/post";
import { ProfileInfo } from "@/entities/profile";
import { PostDetailsDialogs } from "@/feature/post";
import { publicApi, useGetAllUsersPostsQuery } from "@/feature/public/api/public-api";
import { GetPostsResponse, GetPublicProfileResponse, Items } from "@/feature/public/model/types/public-types";
import { useInfinityScroll } from "@/shared/hooks/useInfinityScroll";
import { PublicLayout } from "@/widgets/layout";
import { GetServerSidePropsContext } from "next";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const ownerId = context.params?.ownerId;
  
  // сделать me запрос
  
  // если пользователь авторизован, то реидректить его на /profile/ownerId
  
  // если нет, то логика ниже

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
  const triggerRef = useRef<HTMLDivElement | null>(null);
  
  const [postsList, setPostsList] = useState<Items[]>(allUsersPosts.items);
  const [currentPost, setCurrentPost] = useState<Nullable<PostItem>>(null);
  
  const [cursor, setCursor] = useState<number | undefined>(undefined);
  
  const [openPostDetailsModal, setOpenPostDetailsModal] = useState(false);

  const { data: posts, isFetching, isLoading } = useGetAllUsersPostsQuery({ cursor , userId: ownerId}, {skip: cursor === undefined})

  const handleChangeCurrentPost = (post: PostItem) => {
    setCurrentPost(post);
    setOpenPostDetailsModal(true);
  };
  
  useEffect(() => {
    setPostsList(prevPosts => {
      if (posts && posts.items) {
        return [...prevPosts, ...posts.items]
      }
      
      return prevPosts
    })
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
      <PostsList
        cursor={cursor ? posts?.cursor : allUsersPosts.cursor}
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

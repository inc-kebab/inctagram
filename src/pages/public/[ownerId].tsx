import { ReactElement, useRef, useState } from "react";

import { PostItem, PostsList } from "@/entities/post";
import { ProfileInfo } from "@/entities/profile";
import { PostDetailsDialogs } from "@/feature/post";
import { GetPostsResponse, GetPublicProfileResponse } from "@/feature/public/model/types/public";
import { useInfinityScroll } from "@/shared/hooks/useInfinityScroll";
import { PublicLayout } from "@/widgets/layout";
import { GetServerSidePropsContext } from "next";


export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const ownerId = context.params?.ownerId;

  const [getAllUsersPostsResponse, getPublicProfileResponse] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/public-posts/user/${Number(ownerId)}`),
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/public-profile/${Number(ownerId)}`)
 ])

 const [allUsersPosts, publicProfile] = await Promise.all([
    getAllUsersPostsResponse.json(),
    getPublicProfileResponse.json()
 ])

  if (!allUsersPosts || !publicProfile) {
    return { notFound: true };
  }

  return {
    props: {
      allUsersPosts, publicProfile
    }
  };
};

const OwnerPage = ({ allUsersPosts, publicProfile }: {
  allUsersPosts: GetPostsResponse,
  publicProfile: GetPublicProfileResponse
}) => {

  const triggerRef = useRef<HTMLDivElement | null>(null);
  const [cursor, setCursor] = useState<number | undefined>(undefined);
  const [currentPost, setCurrentPost] = useState<Nullable<PostItem>>(null);
  const [openPostDetailsModal, setOpenPostDetailsModal] = useState(false);

  const handleChangeCurrentPost = (post: PostItem) => {
    setCurrentPost(post);
    setOpenPostDetailsModal(true);
  };

  useInfinityScroll({
    callback: () => setCursor(allUsersPosts?.cursor),
    hasMore: allUsersPosts?.hasMore,
    triggerRef
  });

  return (
    <>
      <ProfileInfo
        myProfile={false}
        userData={{
          aboutMe: publicProfile.aboutMe,
          avatar: publicProfile?.avatars?.["avatar-medium"]?.url,
          username: publicProfile?.username
        }}
      />
      <PostsList
        cursor={allUsersPosts.cursor}
        list={allUsersPosts?.items}
        onSetCurrentPost={handleChangeCurrentPost}
        ref={triggerRef}
      />
      <PostDetailsDialogs
        currentPost={currentPost}
        openPostDetailsModal={openPostDetailsModal}
        setCurrentPost={setCurrentPost}
        setOpenPostDetailsModal={setOpenPostDetailsModal}
      />
    </>
  );
};

OwnerPage.getLayout = (page: ReactElement) => {
  return <PublicLayout>{page}</PublicLayout>;
};

export default OwnerPage;

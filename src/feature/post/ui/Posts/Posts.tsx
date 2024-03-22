import { useState } from 'react'

import { PostItem, PostsList } from '@/entities/post'

import { PostDetailsDialogs } from '../PostDetailsDialogs/PostDetailsDialogs'

interface Props {
  list?: PostItem[]
}

export const Posts = ({ list }: Props) => {
  const [currentPost, setCurrentPost] = useState<PostItem | null>(null)
  const [openPostDetailsModal, setOpenPostDetailsModal] = useState(false)

  const handleChangeCurrentPost = (post: PostItem) => {
    setCurrentPost(post)
    setOpenPostDetailsModal(true)
  }

  return (
    <>
      <PostsList list={list} onSetCurrentPost={handleChangeCurrentPost} />
      <PostDetailsDialogs
        currentPost={currentPost}
        openPostDetailsModal={openPostDetailsModal}
        setCurrentPost={setCurrentPost}
        setOpenPostDetailsModal={setOpenPostDetailsModal}
      />
    </>
  )
}

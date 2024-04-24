import { PostItem } from '@/entities/post'
import { handleErrorResponse } from '@/shared/helpers'

import { useDeletePostMutation } from '../../api/post-api'

export const useDeletePost = (
  currentPost: PostItem,
  callback: () => void,
  setCurrentPost: (post: Nullable<PostItem>) => void
) => {
  const [deletePost, { isLoading: isDeletePostLoad }] = useDeletePostMutation()

  const handleDeletePost = () => {
    currentPost &&
      deletePost({ id: currentPost.id }).then(res => {
        if ('error' in res) {
          handleErrorResponse(res.error)
        } else {
          callback()
          setCurrentPost(null)
        }
      })
  }

  return { handleDeletePost, isDeletePostLoad }
}

import { useRef } from 'react'

import { PostItem } from '@/entities/post'
import { handleErrorResponse } from '@/shared/helpers/handleErrorResponse'
import { UseFormRef } from '@/shared/types/form'

import { useEditPostMutation } from '../../api/post-api'
import { AdditionalRefProps } from '../../model/types/post.types'
import { EditPostFormValues } from '../../model/utils/validators/editPostSchema'

export const useEditPost = (
  post: PostItem,
  confirmEdit: () => void,
  setCurrentPost: (post: PostItem) => void
) => {
  const editPostRef = useRef<Nullable<UseFormRef<EditPostFormValues, AdditionalRefProps>>>(null)

  const [editPost, { isLoading: isEditLoad }] = useEditPostMutation()

  const handleSubmitEditPost = ({ description }: EditPostFormValues) => {
    editPost({ description, id: post.id }).then(res => {
      if ('error' in res && editPostRef.current) {
        const setError = editPostRef.current?.setError

        const errors = handleErrorResponse<EditPostFormValues>(res.error)

        errors?.fieldErrors?.forEach(error => {
          setError(error.field, { message: error.message })
        })
      } else {
        confirmEdit()
        setCurrentPost({ ...post, description })
      }
    })
  }

  return {
    editPostRef,
    handleSubmitEditPost,
    isEditLoad,
  }
}

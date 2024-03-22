import { useRef, useState } from 'react'

import { handleErrorResponse } from '@/shared/helpers/handleErrorResponse'
import { Nullable } from '@/shared/types'
import { UseFormRef } from '@/shared/types/form'

import { useEditPostMutation } from '../../api/post-api'
import { AdditionalRefProps } from '../../model/types/post.types'
import { EditPostFormValues } from '../../model/utils/validators/editPostSchema'

export const useEditPost = () => {
  const editPostRef = useRef<Nullable<UseFormRef<EditPostFormValues, AdditionalRefProps>>>(null)

  const [open, setOpen] = useState(false)

  const [editPost, { isLoading: isEditLoad }] = useEditPostMutation()

  const handleSubmitEditPost = (data: EditPostFormValues) => {
    const newData = {
      description: data.description,
      id: '111',
    }

    editPost(newData).then(res => {
      if ('error' in res && editPostRef.current) {
        const setError = editPostRef.current?.setError

        const errors = handleErrorResponse<EditPostFormValues>(res.error)

        errors?.fieldErrors?.forEach(error => {
          setError(error.field, { message: error.message })
        })
      }
    })
  }

  return {
    confirmModal: { open, setOpen },
    editPostRef,
    handleSubmitEditPost,
    isEditLoad,
  }
}

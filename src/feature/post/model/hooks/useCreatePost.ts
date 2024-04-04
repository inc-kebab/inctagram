import { useRef } from 'react'
import { toast } from 'react-toastify'

import { LocaleType } from '@/../locales'
import { ImageURL } from '@/entities/post'
import { getModifiedImage } from '@/shared/helpers/getModifiedImage'
import { handleErrorResponse } from '@/shared/helpers/handleErrorResponse'
import { UseFormRef } from '@/shared/types/form'

import { useAddImagesMutation, useCreatePostMutation } from '../../api/post-api'
import { AdditionalRefProps } from '../../model/types/post.types'
import { EditPostFormValues } from '../../model/utils/validators/editPostSchema'

interface Params {
  callback?: () => void
  changeStatus?: (status: boolean) => void
  imagesWithFilters: ImageURL[]
  t: LocaleType
}

export const useCreatePost = ({ callback, changeStatus, imagesWithFilters, t }: Params) => {
  const createPostRef = useRef<Nullable<UseFormRef<EditPostFormValues, AdditionalRefProps>>>(null)

  const [loadImages, { isLoading: isImagesLoad }] = useAddImagesMutation()
  const [createPost, { isLoading: isCreateLoad }] = useCreatePostMutation()

  const handleLoadImages = (imagesArray: ImageURL[]) => {
    changeStatus?.(true)
    const formData = new FormData()

    const imagesFiles = imagesArray.map(el =>
      getModifiedImage({
        imageSrc: el.imageURL,
        mode: 'blob',
        t,
      })
    )

    return Promise.all(imagesFiles).then(res => {
      res.forEach(el => {
        formData.append('files', el as Blob)
      })

      return loadImages(formData)
    })
  }

  const handleSubmitCreatePost = ({ description }: EditPostFormValues) => {
    handleLoadImages(imagesWithFilters)
      .then(res => {
        if ('data' in res) {
          const imagesIds = res.data.images.map(el => el.uploadId)

          return createPost({ description, images: imagesIds })
        } else {
          handleErrorResponse(res.error)
        }
      })
      .then(response => {
        if (response) {
          if ('data' in response) {
            callback?.()
            toast.success(t.pages.post.successCreate)
          } else {
            handleErrorResponse(response.error)
          }
        }
      })
      .finally(() => changeStatus?.(false))
  }

  return {
    createPostRef,
    handleSubmitCreatePost,
    isCreatePostLoad: isImagesLoad || isCreateLoad,
  }
}

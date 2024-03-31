import { useRef } from 'react'

import { LocaleType } from '@/../locales'
import { ImageURL } from '@/entities/post'
import { getCroppedImage } from '@/shared/helpers/getCroppedImage'
import { handleErrorResponse } from '@/shared/helpers/handleErrorResponse'
import { UseFormRef } from '@/shared/types/form'

import { useAddImagesMutation, useCreatePostMutation } from '../../api/post-api'
import { AdditionalRefProps } from '../../model/types/post.types'
import { EditPostFormValues } from '../../model/utils/validators/editPostSchema'

interface Params {
  callback?: () => void
  imagesWithFilters: ImageURL[]
  t: LocaleType
}

export const useCreatePost = ({ callback, imagesWithFilters, t }: Params) => {
  const createPostRef = useRef<Nullable<UseFormRef<EditPostFormValues, AdditionalRefProps>>>(null)

  const [loadImages, { isLoading: isImagesLoad }] = useAddImagesMutation()
  const [createPost, { isLoading: isCreateLoad }] = useCreatePostMutation()

  const handleLoadImages = async (imagesArray: ImageURL[]) => {
    const formData = new FormData()

    const imagesFiles = imagesArray.map(el =>
      getCroppedImage({
        imageSrc: el.imageURL,
        mode: 'blob',
        t,
      })
    )

    const res = await Promise.all(imagesFiles)

    res.forEach(el_1 => {
      formData.append('files', el_1 as Blob)
    })

    return await loadImages(formData)
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
          } else {
            handleErrorResponse(response.error)
          }
        }
      })
  }

  return {
    createPostRef,
    handleSubmitCreatePost,
    isCreatePostLoad: isImagesLoad || isCreateLoad,
  }
}

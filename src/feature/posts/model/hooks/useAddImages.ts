import { handleErrorResponse } from '@/shared/helpers/handleErrorResponse'

import { useAddImagesMutation } from '../../api/posts-api'

export const useAddImages = () => {
  const [updatePhoto, { isLoading: isUpdateLoading, isSuccess: isUpdateSuccess }] =
    useAddImagesMutation()

  const handleAddPhoto = (data: FormData[]) => {
    updatePhoto(data).then(response => {
      if ('error' in response) {
        handleErrorResponse(response.error)
      }
    })
  }

  return { handleAddPhoto, isUpdateLoading, isUpdateSuccess }
}

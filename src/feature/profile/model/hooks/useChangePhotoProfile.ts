import { toast } from 'react-toastify'

import { handleErrorResponse } from '@/shared/helpers/handleErrorResponse'

import { useChangeProfilePhotoMutation } from '../../api/profile-api'

export const useChangePhotoProfile = () => {
  const [updatePhoto, { isLoading: isUpdateLoading, isSuccess: isUpdateSuccess }] =
    useChangeProfilePhotoMutation()

  const handleUpdatePhoto = (data: FormData) => {
    updatePhoto(data).then(response => {
      if ('error' in response) {
        handleErrorResponse(response.error)
      } else {
        toast.warning('High load. It may take up to several minutes to replace the image.')
      }
    })
  }

  return { handleUpdatePhoto, isUpdateLoading, isUpdateSuccess }
}

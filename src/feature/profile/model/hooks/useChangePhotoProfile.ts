import { handleErrorResponse } from '@/shared/helpers/handleErrorResponse'

import { useChangeProfilePhotoMutation } from '../../api/profile-api'

export const useChangePhotoProfile = () => {
  const [updatePhoto, { isLoading: isUpdateLoading }] = useChangeProfilePhotoMutation()

  const handleUpdatePhoto = (data: FormData) => {
    updatePhoto(data).then(response => {
      if ('error' in response) {
        handleErrorResponse(response.error)
      }
    })
  }

  return { handleUpdatePhoto, isUpdateLoading }
}

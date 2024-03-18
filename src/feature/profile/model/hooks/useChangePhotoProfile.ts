import { handleErrorResponse } from '@/shared/helpers/handleErrorResponse'

import { useChangeProfilePhotoMutation } from '../../api/profile-api'

export const useChangePhotoProfile = () => {
  const [updatePhoto, { isLoading: isUpdateLoading, isSuccess: isUpdateSuccess }] =
    useChangeProfilePhotoMutation()

  const handleUpdatePhoto = (data: FormData) => {
    console.log('avatar(FormData)', Object.fromEntries(data))
    updatePhoto(data).then(response => {
      if ('error' in response) {
        handleErrorResponse(response.error)
      }
    })
  }

  return { handleUpdatePhoto, isUpdateLoading, isUpdateSuccess }
}

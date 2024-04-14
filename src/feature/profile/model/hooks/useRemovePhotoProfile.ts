import { handleErrorResponse } from '@/shared/helpers'

import { useRemoveProfilePhotoMutation } from '../../api/profile-api'

export const useRemovePhotoProfile = () => {
  const [removePhoto, { isLoading: isRemoveLoading }] = useRemoveProfilePhotoMutation()

  const handleRemovePhoto = () => {
    removePhoto().then(res => {
      if ('error' in res) {
        handleErrorResponse(res.error)
      }
    })
  }

  return { handleRemovePhoto, isRemoveLoading }
}

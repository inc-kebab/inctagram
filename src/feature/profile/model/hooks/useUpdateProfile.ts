import { useRef } from 'react'

import { handleErrorResponse } from '@/shared/helpers/handleErrorResponse'
import { UseFormRef } from '@/shared/types/form'
import { format } from 'date-fns'

import { useUpdateProfileMutation } from '../../api/profile-api'
import { EditProfileFormValues } from '../utils/validators/editProfileSchema'

export const useUpdateProfile = () => {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation()

  const updateProfileRef = useRef<UseFormRef<EditProfileFormValues>>(null)

  const handleUpdateProfile = (data: EditProfileFormValues) => {
    updateProfile({
      ...data,
      birthDate: format(data.birthDate, 'dd-MM-yyyy'),
    }).then(res => {
      if ('error' in res && updateProfileRef.current) {
        const setError = updateProfileRef.current.setError

        const errors = handleErrorResponse<EditProfileFormValues>(res.error)

        errors?.fieldErrors?.forEach(error => {
          setError(error.field, { message: error.message })
        })
      }
    })
  }

  return { handleUpdateProfile, isLoading, updateProfileRef }
}

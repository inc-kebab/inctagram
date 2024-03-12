import { useRef } from 'react'
import { toast } from 'react-toastify'

import { handleErrorResponse } from '@/shared/helpers/handleErrorResponse'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { UseFormRef } from '@/shared/types/form'
import { format } from 'date-fns'

import { useUpdateProfileMutation } from '../../api/profile-api'
import { EditProfileFormValues } from '../utils/validators/editProfileSchema'

export const useUpdateProfile = (successMsg?: string) => {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation()

  const updateProfileRef = useRef<UseFormRef<EditProfileFormValues>>(null)

  const handleUpdateProfile = (data: EditProfileFormValues) => {
    updateProfile({
      ...data,
      birthDate: format(data.birthDate || new Date(), 'dd-MM-yyyy'),
    }).then(res => {
      if ('error' in res && updateProfileRef.current) {
        const setError = updateProfileRef.current.setError

        const errors = handleErrorResponse<EditProfileFormValues>(res.error)

        errors?.fieldErrors?.forEach(error => {
          setError(error.field, { message: error.message })
        })
      } else {
        toast.success(successMsg)
      }
    })
  }

  return { handleUpdateProfile, isLoading, updateProfileRef }
}

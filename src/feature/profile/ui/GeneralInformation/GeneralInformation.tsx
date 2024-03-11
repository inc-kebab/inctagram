import { useRef } from 'react'
import { toast } from 'react-toastify'

import { handleErrorResponse } from '@/shared/helpers/handleErrorResponse'
import { UseFormRef } from '@/shared/types/form'
import { format } from 'date-fns'

import s from './GeneralInformation.module.scss'

import { useGetMyProfileQuery, useUpdateProfileMutation } from '../../api/profile-api'
import { EditProfileFormValues } from '../../model/utils/validators/editProfileSchema'
import { EditProfileForm } from '../EditProfileForm/EditProfileForm'

export const GeneralInformation = () => {
  const { data } = useGetMyProfileQuery()

  const [updateProfile, { isLoading }] = useUpdateProfileMutation()

  const ref = useRef<UseFormRef<EditProfileFormValues>>(null)

  const handleSubmit = (data: EditProfileFormValues) => {
    updateProfile({
      ...data,
      birthDate: format(data.birthDate || new Date(), 'dd-MM-yyyy'),
    }).then(res => {
      if ('error' in res && ref.current) {
        const setError = ref.current.setError

        const errors = handleErrorResponse<EditProfileFormValues>(res.error)

        errors?.fieldErrors?.forEach(error => {
          setError(error.field, { message: error.message })
        })
      } else {
        toast.success('Your settings are saved!')
      }
    })
  }

  return (
    <div className={s.root}>
      <EditProfileForm disabled={isLoading} onSubmit={handleSubmit} ref={ref} userData={data} />
    </div>
  )
}

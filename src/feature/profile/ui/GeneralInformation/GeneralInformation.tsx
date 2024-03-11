import { ReactElement, useRef } from 'react'

import { EditProfileForm } from '@/feature/profile'
import { useGetMyProfileQuery, useUpdateProfileMutation } from '@/feature/profile/api/profile-api'
import { EditProfileFormValues } from '@/feature/profile/model/utils/validators/editProfileSchema'
import { handleErrorResponse } from '@/shared/helpers/handleErrorResponse'
import { UseFormRef } from '@/shared/types/form'
import { Page } from '@/shared/types/layout'
import { SidebarLayout } from '@/widgets/layout'
import { format } from 'date-fns'

import s from './GeneralInformation.module.scss'

const GeneralInformation: Page = () => {
  const { data } = useGetMyProfileQuery()
  const [updateProfile] = useUpdateProfileMutation()

  console.log('data', data)

  const ref = useRef<UseFormRef<EditProfileFormValues>>(null)

  return (
    <div className={s.root}>
      <EditProfileForm
        onSubmit={(data: EditProfileFormValues) => {
          updateProfile({
            ...data,
            birthDate: format(data.birthDate, 'dd-MM-yyyy'),
          }).then(res => {
            if ('error' in res && ref.current) {
              const setError = ref.current.setError

              const errors = handleErrorResponse<EditProfileFormValues>(res.error)

              errors?.fieldErrors?.forEach(error => {
                setError(error.field, { message: error.message })
              })
            }
          })
        }}
        ref={ref}
        userData={data}
      />
    </div>
  )
}

GeneralInformation.getLayout = (page: ReactElement) => {
  return <SidebarLayout>{page}</SidebarLayout>
}

export default GeneralInformation

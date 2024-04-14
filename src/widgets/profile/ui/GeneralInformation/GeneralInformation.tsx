import {
  EditProfileForm,
  ProfilePhoto,
  useChangePhotoProfile,
  useGetMyProfileQuery,
  useRemovePhotoProfile,
  useUpdateProfile,
} from '@/feature/profile'
import { useTranslation } from '@/shared/hooks'

import s from './GeneralInformation.module.scss'

export const GeneralInformation = () => {
  const { t } = useTranslation()

  const { data, isLoading: isGetProfileLoad } = useGetMyProfileQuery(undefined)

  const { handleUpdateProfile, isLoading, updateProfileRef } = useUpdateProfile(
    t.label.successUpdateProfile
  )
  const { handleUpdatePhoto, isUpdateLoading, isUpdateSuccess } = useChangePhotoProfile()
  const { handleRemovePhoto, isRemoveLoading } = useRemovePhotoProfile()

  return (
    <div className={s.root}>
      <ProfilePhoto
        avaUrlFromServer={data?.avatars?.['avatar-medium']?.url}
        className={s.photo}
        disabledDelete={isRemoveLoading}
        disabledUpdate={isUpdateLoading}
        isSuccessUpdate={isUpdateSuccess}
        onDeletePhoto={handleRemovePhoto}
        onUpdatePhoto={handleUpdatePhoto}
      />
      <EditProfileForm
        disabled={isLoading || isGetProfileLoad}
        onSubmit={handleUpdateProfile}
        ref={updateProfileRef}
        userData={data}
      />
    </div>
  )
}

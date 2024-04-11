import { useTranslation } from '@/shared/hooks'

import s from './GeneralInformation.module.scss'

import { useGetMyProfileQuery } from '../../api/profile-api'
import { useChangePhotoProfile } from '../../model/hooks/useChangePhotoProfile'
import { useRemovePhotoProfile } from '../../model/hooks/useRemovePhotoProfile'
import { useUpdateProfile } from '../../model/hooks/useUpdateProfile'
import { EditProfileForm } from '../EditProfileForm/EditProfileForm'
import { ProfilePhoto } from '../ProfilePhoto/ProfilePhoto'

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

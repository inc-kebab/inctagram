import s from './GeneralInformation.module.scss'

import { useGetMyProfileQuery } from '../../api/profile-api'
import { useChangePhotoProfile } from '../../model/hooks/useChangePhotoProfile'
import { useRemovePhotoProfile } from '../../model/hooks/useRemovePhotoProfile'
import { useUpdateProfile } from '../../model/hooks/useUpdateProfile'
import { EditProfileForm } from '../EditProfileForm/EditProfileForm'
import { ProfilePhoto } from '../ProfilePhoto/ProfilePhoto'

export const GeneralInformation = () => {
  const { data } = useGetMyProfileQuery()

  const { handleUpdateProfile, isLoading, updateProfileRef } = useUpdateProfile()
  const { handleUpdatePhoto, isUpdateLoading } = useChangePhotoProfile()
  const { handleRemovePhoto, isRemoveLoading } = useRemovePhotoProfile()

  return (
    <div className={s.root}>
      <ProfilePhoto
        avaUrlFromServer={data?.avatars?.avatar?.url}
        className={s.photo}
        disabledDelete={isRemoveLoading}
        disabledUpdate={isUpdateLoading}
        onDeletePhoto={handleRemovePhoto}
        onUpdatePhoto={handleUpdatePhoto}
      />
      <EditProfileForm
        disabled={isLoading}
        onSubmit={handleUpdateProfile}
        ref={updateProfileRef}
        userData={data}
      />
    </div>
  )
}

import { useAddAvatarMutation } from '@/feature/profile'

type Props = {
  photo: File
}

export const CropperPhoto = ({ photo }: Props) => {
  const [addAvatar, { isSuccess }] = useAddAvatarMutation()

  return <div>Cropper</div>
}

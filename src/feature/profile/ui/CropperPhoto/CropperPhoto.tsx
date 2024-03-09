import { useState } from 'react'
import Cropper from 'react-easy-crop'

import { CroppedArea } from '@/feature/profile/model/types/profile.types'
import { getCroppedImg } from '@/feature/profile/model/utils/getCroppedImg'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Button } from '@/shared/ui/Button'

import s from './CropperPhoto.module.scss'

type Props = {
  addAvatar: (data: FormData) => void
  avatarUrl: string
  disabled: boolean
}

export const CropperPhoto = ({ addAvatar, avatarUrl, disabled }: Props) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedArea | null>(null)
  const [zoom, setZoom] = useState(1)
  const { t } = useTranslation()

  const addAvatarHandler = () => {
    if (croppedAreaPixels) {
      getCroppedImg({ crop: croppedAreaPixels, fileName: 'file', imageSrc: avatarUrl })
        .then(res => {
          addAvatar(res as FormData)
        })
        .catch(e => console.log(e))
    }
  }

  const onCropComplete = (
    croppedArea: { x: number; y: number },
    croppedAreaPixels: CroppedArea
  ) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  return (
    <div className={s.cropperContainer}>
      <div className={s.cropperWindow}>
        <Cropper
          aspect={1}
          crop={crop}
          cropShape="round"
          image={avatarUrl}
          objectFit="cover"
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          showGrid={false}
          zoom={zoom}
        />
      </div>
      <Button disabled={disabled} onClick={addAvatarHandler}>
        {t.button.save}
      </Button>
    </div>
  )
}

import { useState } from 'react'
import Cropper from 'react-easy-crop'

import { useTranslation } from '@/shared/hooks/useTranslation'
import { Button } from '@/shared/ui/Button'

import s from './CropperPhoto.module.scss'

import { CroppedArea } from '../../model/types/profile.types'

type Crop = { x: number; y: number }

type Props = {
  avatarUrl: string
  disabled?: boolean
  onSetCroppedArea: (size: CroppedArea) => void
}

export const CropperPhoto = ({ avatarUrl, disabled, onSetCroppedArea }: Props) => {
  const [crop, setCrop] = useState<Crop>({ x: 0, y: 0 })

  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Nullable<CroppedArea>>(null)

  const [zoom, setZoom] = useState(1)

  const { t } = useTranslation()

  const handleCropComplete = (_: Crop, croppedAreaPixels: CroppedArea) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  const handleSetCroppedArea = () => {
    if (croppedAreaPixels) {
      onSetCroppedArea(croppedAreaPixels)
    }
  }

  return (
    <div className={s.cropperContainer}>
      <div title="Use the mouse wheel to zoom out/Increasing the size">x{zoom}</div>
      <div className={s.cropperWindow}>
        <Cropper
          aspect={1}
          crop={crop}
          cropShape="round"
          image={avatarUrl}
          objectFit="cover"
          onCropChange={setCrop}
          onCropComplete={handleCropComplete}
          onZoomChange={setZoom}
          showGrid={false}
          zoom={zoom}
        />
      </div>
      <Button className={s.save} disabled={disabled} onClick={handleSetCroppedArea}>
        {t.button.simple_save}
      </Button>
    </div>
  )
}

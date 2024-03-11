import { useState } from 'react'
import Cropper from 'react-easy-crop'

import { CroppedArea } from '@/feature/profile'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Button } from '@/shared/ui/Button'
import { DialogClose } from '@/shared/ui/Dialog/DialogClose'

import s from './CropperPhoto.module.scss'

type Crop = { x: number; y: number }

type Props = {
  avatarUrl: string
  disabled: boolean
  onSetCroppedArea: (size: CroppedArea) => void
}

export const CropperPhoto = ({ avatarUrl, disabled, onSetCroppedArea }: Props) => {
  const [crop, setCrop] = useState<Crop>({ x: 0, y: 0 })

  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedArea | null>(null)

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
      <DialogClose>
        <Button disabled={disabled} onClick={handleSetCroppedArea}>
          {t.button.save}
        </Button>
      </DialogClose>
    </div>
  )
}

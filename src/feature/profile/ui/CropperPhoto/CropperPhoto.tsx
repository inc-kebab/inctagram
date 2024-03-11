import { useState } from 'react'
import Cropper from 'react-easy-crop'

import { CroppedArea } from '@/feature/profile/model/types/profile.types'
import { getCroppedImg } from '@/feature/profile/model/utils/getCroppedImg'
import { handleErrorResponse } from '@/shared/helpers/handleErrorResponse'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Button } from '@/shared/ui/Button'
import { DialogClose } from '@/shared/ui/Dialog/DialogClose'

import s from './CropperPhoto.module.scss'

type Props = {
  addAvatarHandler: (size: any) => void
  avatarUrl: string
  disabled: boolean
}

export const CropperPhoto = ({ addAvatarHandler, avatarUrl, disabled }: Props) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedArea | null>(null)
  const [zoom, setZoom] = useState(1)
  const { t } = useTranslation()

  const onCropComplete = (
    croppedArea: { x: number; y: number },
    croppedAreaPixels: CroppedArea
  ) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  const someFn = () => addAvatarHandler(croppedAreaPixels)

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
      <DialogClose>
        <Button disabled={disabled} onClick={someFn}>
          {t.button.save}
        </Button>
      </DialogClose>
    </div>
  )
}

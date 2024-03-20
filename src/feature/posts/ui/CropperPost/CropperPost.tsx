import { useState } from 'react'
import Cropper from 'react-easy-crop'

import { ExpandBtn, ImagesArrayBtn } from '@/entities/post'
import { CroppedArea } from '@/feature/profile/model/types/profile.types'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Button } from '@/shared/ui/Button'
import Image from 'next/image'

import s from './CropperPost.module.scss'

import { CurrentWindow } from '../AddPostPhotoDialog/AddPostPhotoDialog'

type Crop = { x: number; y: number }

type Props = {
  cropShape?: 'rect' | 'round'
  currentWindow: CurrentWindow
  disabled?: boolean
  imageURL: string
  onSetCroppedArea: (croppedArea?: CroppedArea) => void
  setPhoto: (photo: File) => void
}

export const CropperPost = ({
  cropShape,
  currentWindow,
  disabled,
  imageURL,
  onSetCroppedArea,
  setPhoto,
}: Props) => {
  const [aspect, setAspect] = useState(0)

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
    } else {
      onSetCroppedArea()
    }
  }

  return (
    <div className={s.container}>
      {currentWindow === 'expand' && (
        <>
          <div className={s.cropperWindow}>
            {aspect === 0 && <Image alt="" fill objectFit="cover" src={imageURL} />}
            {aspect > 0 && (
              <Cropper
                aspect={aspect}
                crop={crop}
                cropShape={cropShape}
                image={imageURL}
                objectFit="cover"
                onCropChange={setCrop}
                onCropComplete={handleCropComplete}
                onZoomChange={setZoom}
                showGrid={false}
                zoom={zoom}
              />
            )}
          </div>
          <ExpandBtn aspect={aspect} setAspect={setAspect} />

          <ImagesArrayBtn setPhoto={setPhoto} />
        </>
      )}
      {currentWindow === 'filter' && (
        <div className={s.cropperWindow2}>
          <div>11</div>
          <div>22</div>
        </div>
      )}
      {currentWindow === 'description' && (
        <>
          <div className={s.cropperWindow}>
            {aspect === 0 && <Image alt="" fill objectFit="cover" src={imageURL} />}
            {aspect > 0 && (
              <Cropper
                aspect={aspect}
                crop={crop}
                cropShape={cropShape}
                image={imageURL}
                objectFit="cover"
                onCropChange={setCrop}
                onCropComplete={handleCropComplete}
                onZoomChange={setZoom}
                showGrid={false}
                zoom={zoom}
              />
            )}
          </div>
          <div className={s.cropperWindow}>333333333333333</div>
        </>
      )}

      <Button className={s.save} disabled={disabled} onClick={handleSetCroppedArea} variant="text">
        {t.button.next}
      </Button>
    </div>
  )
}

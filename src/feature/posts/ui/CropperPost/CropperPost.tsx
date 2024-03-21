import { useState } from 'react'
import Cropper from 'react-easy-crop'

import { ExpandBtn, ImagesArrayBtn } from '@/entities/post'
import { CroppedArea } from '@/feature/profile/model/types/profile.types'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Button } from '@/shared/ui/Button'
// @ts-ignore
import { Splide, SplideSlide } from '@splidejs/react-splide'
import Image from 'next/image'

import '@splidejs/splide/dist/css/splide.min.css'

import s from './CropperPost.module.scss'

import { ImageObj } from '../../api/posts-slice'
import { CurrentWindow } from '../AddPostPhotoDialog/AddPostPhotoDialog'

type Crop = { x: number; y: number }

type Props = {
  cropShape?: 'rect' | 'round'
  currentWindow: CurrentWindow
  disabled?: boolean
  images: ImageObj[]
  onSetCroppedArea: (croppedArea?: CroppedArea) => void
}

export const CropperPost = ({
  cropShape,
  currentWindow,
  disabled,
  images,
  onSetCroppedArea,
}: Props) => {
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
          <Splide aria-label="My Favorite Images" className={s.slide}>
            {images.map((image, i) => (
              <SplideSlide className={s.splideSlide} key={image.imageURL + i}>
                {image.aspect === 0 && <Image alt="" fill objectFit="cover" src={image.imageURL} />}
                {image.aspect > 0 && (
                  <Cropper
                    crop={crop}
                    cropShape="rect"
                    image={image.imageURL}
                    objectFit="cover"
                    onCropChange={setCrop}
                    onCropComplete={handleCropComplete}
                    onZoomChange={setZoom}
                    showGrid={false}
                    zoom={zoom}
                  />
                )}
              </SplideSlide>
            ))}
          </Splide>
          <ExpandBtn image={image} images={images} />
          <ImagesArrayBtn images={images} />
        </>
      )}

      <Button className={s.save} disabled={disabled} onClick={handleSetCroppedArea} variant="text">
        {t.button.next}
      </Button>
    </div>
  )
}

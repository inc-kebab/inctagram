import { useState } from 'react'
import Cropper from 'react-easy-crop'

import { useAppDispatch, useAppSelector } from '@/app/store/store'
import { CroppedArea } from '@/feature/profile/model/types/profile.types'
import { avatarSchema } from '@/feature/profile/model/utils/validators/addAvatar'
import { Close } from '@/shared/assets/icons/common/index'
import { Image as ImageIcon } from '@/shared/assets/icons/fill/index'
import { PlusCircle } from '@/shared/assets/icons/outline/index'
import { useTranslation } from '@/shared/hooks/useTranslation'
import { Button } from '@/shared/ui/Button'
import { InputFile } from '@/shared/ui/InputFile'
import clsx from 'clsx'
import Image from 'next/image'

import s from './CropperPost.module.scss'

import { useDeleteImageMutation } from '../../api/posts-api'
import { postsActions } from '../../api/posts-slice'

type Crop = { x: number; y: number }

type Props = {
  cropShape?: 'rect' | 'round'
  disabled?: boolean
  imageURL: string
  onSetCroppedArea: (size: CroppedArea) => void
  setPhoto: (photo: File) => void
}

export const CropperPost = ({
  cropShape,
  disabled,
  imageURL,
  onSetCroppedArea,
  setPhoto,
}: Props) => {
  const arr = useAppSelector(state => state.posts.images)
  const dispatch = useAppDispatch()
  const [deleteImage] = useDeleteImageMutation()
  const [crop, setCrop] = useState<Crop>({ x: 0, y: 0 })
  const [isOpen, setIsOpen] = useState(false)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedArea | null>(null)
  const [error, setError] = useState('')
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
  const handleDeleteImage = (uploadId: string) => {
    deleteImage(uploadId)
    dispatch(postsActions.removeImage(uploadId))
  }

  return (
    <div className={s.cropperContainer}>
      <div className={s.cropperWindow}>
        <Cropper
          aspect={1}
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
      </div>
      <Button className={s.save} disabled={disabled} onClick={handleSetCroppedArea} variant="text">
        {t.button.next}
      </Button>

      <Button
        className={s.imagesArrayBtn}
        onClick={() => setIsOpen(!isOpen)}
        startIcon={<ImageIcon className={clsx(isOpen && s.isOpenIcon)} height={21} width={21} />}
      />
      {isOpen && (
        <div className={s.miniPhotosWrapper}>
          {arr &&
            arr.map(img => (
              <div className={s.miniPhoto} key={img.imageURL}>
                <Button
                  className={s.deleteBtn}
                  onClick={() => handleDeleteImage(img.uploadId)}
                  startIcon={<Close color="white" height={13} width={13} />}
                  variant="text"
                />
                <Image alt="" height={80} src={img.imageURL} width={80} />
              </div>
            ))}
          <InputFile
            accept=".png, .jpg, .jpeg"
            setError={setError}
            setFile={setPhoto}
            zodSchema={avatarSchema(t)}
          >
            <PlusCircle className={s.addPhotoBtn} />
          </InputFile>
        </div>
      )}
    </div>
  )
}

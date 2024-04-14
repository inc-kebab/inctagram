import Cropper, { Point } from 'react-easy-crop'

import { ImageObj, postsActions } from '@/entities/post'
import { useAppDispatch } from '@/shared/hooks'

type Props = {
  image: ImageObj
  onChangeZoom: (zoom: number) => void
}

export const CropperImage = ({ image, onChangeZoom }: Props) => {
  const { aspect, crop, imageURL, zoom } = image

  const dispatch = useAppDispatch()

  const handleChangeCrop = (crop: Point) => {
    dispatch(postsActions.updateImage({ crop, imageURL }))
  }

  const handleCropComplete = (imageURL: string) => (_: Point, croppedAreaPixels: CroppedArea) => {
    if (croppedAreaPixels) {
      dispatch(postsActions.updateImage({ croppedAreaPixels, imageURL }))
    }
  }

  return (
    <Cropper
      aspect={aspect}
      crop={crop}
      cropShape="rect"
      image={imageURL}
      objectFit="cover"
      onCropChange={handleChangeCrop}
      onCropComplete={handleCropComplete(imageURL)}
      onZoomChange={onChangeZoom}
      showGrid={false}
      style={{ cropAreaStyle: { border: '2px solid var(--primary-500)' } }}
      zoom={zoom}
    />
  )
}

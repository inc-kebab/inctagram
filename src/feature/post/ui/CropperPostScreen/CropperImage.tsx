import Cropper, { Point } from 'react-easy-crop'

import { useAppDispatch } from '@/app'
import { ImageObj, postsActions } from '@/entities/post'

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
      objectFit="contain"
      onCropChange={handleChangeCrop}
      onCropComplete={handleCropComplete(imageURL)}
      onZoomChange={onChangeZoom}
      showGrid={false}
      zoom={zoom}
    />
  )
}

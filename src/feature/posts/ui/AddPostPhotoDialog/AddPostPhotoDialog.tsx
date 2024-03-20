import { ReactNode } from 'react'

import { Dialog } from '@/shared/ui/Dialog'
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

import s from './AddPostPhotoDialog.module.scss'

import { CroppedArea } from '../../../profile/model/types/profile.types'
import { InputPhoto } from '../../../profile/ui/InputPhoto/InputPhoto'
import { CropperPost } from '../CropperPost/CropperPost'

type Props = {
  arr?: string[]
  disabled?: boolean
  imageURLArray: string[]
  onImageURL: (imageURLArray: string[]) => void
  onOpenChange?: (open: boolean) => void
  onSetCroppedArea: (croppedArea?: CroppedArea) => void
  open?: boolean
  title?: string
  trigger: ReactNode
  variant?: 'post' | 'profile'
}

export const AddPostPhotoDialog = ({
  imageURLArray,
  onImageURL,
  onOpenChange,
  onSetCroppedArea,
  open,
  title,
  trigger,
  variant,
  ...rest
}: Props) => {
  const handleSetPhoto = (file: File) => {
    onImageURL([...imageURLArray, URL.createObjectURL(file)])
  }

  return (
    <Dialog
      className={s.dialog}
      handleBackBtn={onImageURL}
      onOpenChange={onOpenChange}
      open={open}
      title={title}
      trigger={trigger}
      variant={variant}
    >
      {imageURLArray.length > 0 ? (
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          navigation
          onSlideChange={() => console.log('slide change')}
          onSwiper={swiper => console.log(swiper)}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          slidesPerView={1}
          spaceBetween={50}
        >
          {imageURLArray.map((imageURL, i) => (
            <SwiperSlide key={imageURL + i}>
              <CropperPost
                cropShape="rect"
                imageURL={imageURL}
                onSetCroppedArea={onSetCroppedArea}
                setPhoto={handleSetPhoto}
                {...rest}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <InputPhoto setPhoto={handleSetPhoto} />
      )}
    </Dialog>
  )
}
